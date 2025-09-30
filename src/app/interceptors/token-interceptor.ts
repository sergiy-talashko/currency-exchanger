import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = environment.token;
  const apiUrl = environment.apiUrl;

  console.log(req);

  const newReq = req.clone({
    url: apiUrl + '/' + req.url,
    headers: req.headers.append('Authorization', `Bearer ${authToken}`),
  });
  return next(newReq);
};
