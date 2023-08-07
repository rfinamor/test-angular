import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Users } from '../models/constants';
import { ProductService } from './products.service';
import { Observable, delay, dematerialize, materialize, of, throwError } from 'rxjs';
import { User } from '../models/user.model';


let users: any = Users.users;


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    private ProductService!: ProductService;
    constructor(private injector: Injector) {
    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = req;
        
        this.ProductService = this.injector.get(ProductService);
        let productService = this.ProductService;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/shopping') && method === 'GET':
                    return getProducts(productService);
                default:
                    return next.handle(req);
            }
        }

        function authenticate() {
            const { username, password } = body;
            const user : User[] = users.find((x: { user: string; password: string; }) => x.user === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                user: user,
                token: '123456'
            })
        }

        function getProducts(productService : ProductService){
            if(isLoggedIn()){
                    let products = productService.getProducts()
                    return ok(
                        products
                    );
                 
            } else {
                return unauthorized();
            }          
        }


        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500));
        }

        function error(message: string) {
            return throwError(() => ({ error: { message } }))
                .pipe(materialize(), delay(500), dematerialize()); 
        }

        function unauthorized() {
            return throwError(() => ({ status: 401, error: { message: 'Unauthorized' } }))
                .pipe(materialize(), delay(500), dematerialize());
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer 123456';
        }
    }
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
