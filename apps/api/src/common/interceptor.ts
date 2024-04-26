// import { ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
// import { classToPlain } from "class-transformer";
// import { Observable, map } from "rxjs";

// @Injectable()
// export class TransformInterceptor implements NestInterceptor {
//   intercept(
//     context: ExecutionContext,
//     call$: Observable<any>,
//   ): Observable<any> {
//     return call$.pipe(map(data => classToPlain(data)));
//   }
// }