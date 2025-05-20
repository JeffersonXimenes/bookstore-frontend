export class InternalUrls {
  public static readonly REDIRECT_LOGIN = '/login';
  public static readonly REDIRECT_HOME = '/home';
}

export class ApiUrls {
  public static readonly BASE_URL = 'http://localhost:8080';
}

export class AuthUrls {
  public static readonly LOGIN = `${ApiUrls.BASE_URL}/auth/login`;
  public static readonly REGISTER = `${ApiUrls.BASE_URL}/auth/register`;
}

export class BookUrls {
  public static readonly LIST = `${ApiUrls.BASE_URL}/books`;
  public static readonly BOOKS_PAGINATED = (page: number, size: number): string => `${BookUrls.LIST}?page=${page}&size=${size}`;
  public static readonly DETAIL = (id: number) => `${ApiUrls.BASE_URL}/books/${id}`;
}
