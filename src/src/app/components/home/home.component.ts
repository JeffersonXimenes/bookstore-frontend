import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { MatCardModule} from '@angular/material/card';
import { CommonModule, DecimalPipe } from '@angular/common';
import { BookDetail } from '../models/book-detail';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailDialogComponent } from '../detail/book-detail-dialog.component';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../../services/auth-service';
import {BookUrls, InternalUrls} from '../../constants/api-urls';

@Component({
  selector: 'component-home',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    DecimalPipe,
    HttpClientModule,
    MatButton,

  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'author', 'price', 'options'];
  dataSource: any[] = [];
  userName = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName() ?? 'Não informado';
  }

  ngAfterViewInit(): void {

    // Dispara busca inicial com o pageSize atual
    this.loadBooks(0, this.paginator.pageSize || 10);

    // Atualiza dados ao trocar de página
    this.paginator.page.subscribe(event => {
      this.loadBooks(event.pageIndex, event.pageSize);
    });
  }

  loadBooks(page: number = 0, size: number = 10): void {
    const headers = new HttpHeaders({
      'Authorization': this.authService.getAuthHeader(),
    });

    this.http.get<any[]>(BookUrls.BOOKS_PAGINATED(page, size), {
      headers,
      observe: 'response'
    }).subscribe(response => {
      const books = response.body || [];

      const totalElements = Number(response.headers.get('X-Total-Elements'));
      const currentPage = Number(response.headers.get('X-Current-Page'));
      const pageSize = Number(response.headers.get('X-Page-Size'));

      this.dataSource = books;

      // Atualiza paginator manualmente
      if (this.paginator) {
        this.paginator.length = totalElements;
        this.paginator.pageIndex = currentPage;
        this.paginator.pageSize = pageSize;
      }
    });
  }

  showBookDetails(bookId: number): void {
    const headers = new HttpHeaders({
      'Authorization': this.authService.getAuthHeader(),
    });

    this.http.get<BookDetail>(BookUrls.DETAIL(bookId), { headers })
      .subscribe(book => {
        this.dialog.open(BookDetailDialogComponent, {
          data: book,
          width: '500px'
        });
      });
  }

  logout(): void {
    this.router.navigate([InternalUrls.REDIRECT_LOGIN]);
  }
}
