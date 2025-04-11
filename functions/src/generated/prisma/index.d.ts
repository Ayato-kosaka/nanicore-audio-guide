
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model backend_event_logs
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type backend_event_logs = $Result.DefaultSelection<Prisma.$backend_event_logsPayload>
/**
 * Model external_api_logs
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type external_api_logs = $Result.DefaultSelection<Prisma.$external_api_logsPayload>
/**
 * Model frontend_event_logs
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type frontend_event_logs = $Result.DefaultSelection<Prisma.$frontend_event_logsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const backend_event_logs_error_level: {
  trace: 'trace',
  debug: 'debug',
  info: 'info',
  warn: 'warn',
  error: 'error'
};

export type backend_event_logs_error_level = (typeof backend_event_logs_error_level)[keyof typeof backend_event_logs_error_level]


export const frontend_event_logs_error_level: {
  trace: 'trace',
  debug: 'debug',
  info: 'info',
  warn: 'warn',
  error: 'error'
};

export type frontend_event_logs_error_level = (typeof frontend_event_logs_error_level)[keyof typeof frontend_event_logs_error_level]

}

export type backend_event_logs_error_level = $Enums.backend_event_logs_error_level

export const backend_event_logs_error_level: typeof $Enums.backend_event_logs_error_level

export type frontend_event_logs_error_level = $Enums.frontend_event_logs_error_level

export const frontend_event_logs_error_level: typeof $Enums.frontend_event_logs_error_level

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Backend_event_logs
 * const backend_event_logs = await prisma.backend_event_logs.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Backend_event_logs
   * const backend_event_logs = await prisma.backend_event_logs.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.backend_event_logs`: Exposes CRUD operations for the **backend_event_logs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Backend_event_logs
    * const backend_event_logs = await prisma.backend_event_logs.findMany()
    * ```
    */
  get backend_event_logs(): Prisma.backend_event_logsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.external_api_logs`: Exposes CRUD operations for the **external_api_logs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more External_api_logs
    * const external_api_logs = await prisma.external_api_logs.findMany()
    * ```
    */
  get external_api_logs(): Prisma.external_api_logsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.frontend_event_logs`: Exposes CRUD operations for the **frontend_event_logs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Frontend_event_logs
    * const frontend_event_logs = await prisma.frontend_event_logs.findMany()
    * ```
    */
  get frontend_event_logs(): Prisma.frontend_event_logsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    backend_event_logs: 'backend_event_logs',
    external_api_logs: 'external_api_logs',
    frontend_event_logs: 'frontend_event_logs'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "backend_event_logs" | "external_api_logs" | "frontend_event_logs"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      backend_event_logs: {
        payload: Prisma.$backend_event_logsPayload<ExtArgs>
        fields: Prisma.backend_event_logsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.backend_event_logsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backend_event_logsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.backend_event_logsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backend_event_logsPayload>
          }
          findFirst: {
            args: Prisma.backend_event_logsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backend_event_logsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.backend_event_logsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backend_event_logsPayload>
          }
          findMany: {
            args: Prisma.backend_event_logsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backend_event_logsPayload>[]
          }
          create: {
            args: Prisma.backend_event_logsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backend_event_logsPayload>
          }
          createMany: {
            args: Prisma.backend_event_logsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.backend_event_logsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backend_event_logsPayload>[]
          }
          delete: {
            args: Prisma.backend_event_logsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backend_event_logsPayload>
          }
          update: {
            args: Prisma.backend_event_logsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backend_event_logsPayload>
          }
          deleteMany: {
            args: Prisma.backend_event_logsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.backend_event_logsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.backend_event_logsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backend_event_logsPayload>[]
          }
          upsert: {
            args: Prisma.backend_event_logsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backend_event_logsPayload>
          }
          aggregate: {
            args: Prisma.Backend_event_logsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBackend_event_logs>
          }
          groupBy: {
            args: Prisma.backend_event_logsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Backend_event_logsGroupByOutputType>[]
          }
          count: {
            args: Prisma.backend_event_logsCountArgs<ExtArgs>
            result: $Utils.Optional<Backend_event_logsCountAggregateOutputType> | number
          }
        }
      }
      external_api_logs: {
        payload: Prisma.$external_api_logsPayload<ExtArgs>
        fields: Prisma.external_api_logsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.external_api_logsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$external_api_logsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.external_api_logsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$external_api_logsPayload>
          }
          findFirst: {
            args: Prisma.external_api_logsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$external_api_logsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.external_api_logsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$external_api_logsPayload>
          }
          findMany: {
            args: Prisma.external_api_logsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$external_api_logsPayload>[]
          }
          create: {
            args: Prisma.external_api_logsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$external_api_logsPayload>
          }
          createMany: {
            args: Prisma.external_api_logsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.external_api_logsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$external_api_logsPayload>[]
          }
          delete: {
            args: Prisma.external_api_logsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$external_api_logsPayload>
          }
          update: {
            args: Prisma.external_api_logsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$external_api_logsPayload>
          }
          deleteMany: {
            args: Prisma.external_api_logsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.external_api_logsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.external_api_logsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$external_api_logsPayload>[]
          }
          upsert: {
            args: Prisma.external_api_logsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$external_api_logsPayload>
          }
          aggregate: {
            args: Prisma.External_api_logsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExternal_api_logs>
          }
          groupBy: {
            args: Prisma.external_api_logsGroupByArgs<ExtArgs>
            result: $Utils.Optional<External_api_logsGroupByOutputType>[]
          }
          count: {
            args: Prisma.external_api_logsCountArgs<ExtArgs>
            result: $Utils.Optional<External_api_logsCountAggregateOutputType> | number
          }
        }
      }
      frontend_event_logs: {
        payload: Prisma.$frontend_event_logsPayload<ExtArgs>
        fields: Prisma.frontend_event_logsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.frontend_event_logsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$frontend_event_logsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.frontend_event_logsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$frontend_event_logsPayload>
          }
          findFirst: {
            args: Prisma.frontend_event_logsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$frontend_event_logsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.frontend_event_logsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$frontend_event_logsPayload>
          }
          findMany: {
            args: Prisma.frontend_event_logsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$frontend_event_logsPayload>[]
          }
          create: {
            args: Prisma.frontend_event_logsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$frontend_event_logsPayload>
          }
          createMany: {
            args: Prisma.frontend_event_logsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.frontend_event_logsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$frontend_event_logsPayload>[]
          }
          delete: {
            args: Prisma.frontend_event_logsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$frontend_event_logsPayload>
          }
          update: {
            args: Prisma.frontend_event_logsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$frontend_event_logsPayload>
          }
          deleteMany: {
            args: Prisma.frontend_event_logsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.frontend_event_logsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.frontend_event_logsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$frontend_event_logsPayload>[]
          }
          upsert: {
            args: Prisma.frontend_event_logsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$frontend_event_logsPayload>
          }
          aggregate: {
            args: Prisma.Frontend_event_logsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFrontend_event_logs>
          }
          groupBy: {
            args: Prisma.frontend_event_logsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Frontend_event_logsGroupByOutputType>[]
          }
          count: {
            args: Prisma.frontend_event_logsCountArgs<ExtArgs>
            result: $Utils.Optional<Frontend_event_logsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    backend_event_logs?: backend_event_logsOmit
    external_api_logs?: external_api_logsOmit
    frontend_event_logs?: frontend_event_logsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model backend_event_logs
   */

  export type AggregateBackend_event_logs = {
    _count: Backend_event_logsCountAggregateOutputType | null
    _min: Backend_event_logsMinAggregateOutputType | null
    _max: Backend_event_logsMaxAggregateOutputType | null
  }

  export type Backend_event_logsMinAggregateOutputType = {
    id: string | null
    event_name: string | null
    error_level: $Enums.backend_event_logs_error_level | null
    function_name: string | null
    user_id: string | null
    request_id: string | null
    created_at: Date | null
    created_commit_id: string | null
  }

  export type Backend_event_logsMaxAggregateOutputType = {
    id: string | null
    event_name: string | null
    error_level: $Enums.backend_event_logs_error_level | null
    function_name: string | null
    user_id: string | null
    request_id: string | null
    created_at: Date | null
    created_commit_id: string | null
  }

  export type Backend_event_logsCountAggregateOutputType = {
    id: number
    event_name: number
    error_level: number
    function_name: number
    user_id: number
    payload: number
    request_id: number
    created_at: number
    created_commit_id: number
    _all: number
  }


  export type Backend_event_logsMinAggregateInputType = {
    id?: true
    event_name?: true
    error_level?: true
    function_name?: true
    user_id?: true
    request_id?: true
    created_at?: true
    created_commit_id?: true
  }

  export type Backend_event_logsMaxAggregateInputType = {
    id?: true
    event_name?: true
    error_level?: true
    function_name?: true
    user_id?: true
    request_id?: true
    created_at?: true
    created_commit_id?: true
  }

  export type Backend_event_logsCountAggregateInputType = {
    id?: true
    event_name?: true
    error_level?: true
    function_name?: true
    user_id?: true
    payload?: true
    request_id?: true
    created_at?: true
    created_commit_id?: true
    _all?: true
  }

  export type Backend_event_logsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which backend_event_logs to aggregate.
     */
    where?: backend_event_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of backend_event_logs to fetch.
     */
    orderBy?: backend_event_logsOrderByWithRelationInput | backend_event_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: backend_event_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` backend_event_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` backend_event_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned backend_event_logs
    **/
    _count?: true | Backend_event_logsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Backend_event_logsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Backend_event_logsMaxAggregateInputType
  }

  export type GetBackend_event_logsAggregateType<T extends Backend_event_logsAggregateArgs> = {
        [P in keyof T & keyof AggregateBackend_event_logs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBackend_event_logs[P]>
      : GetScalarType<T[P], AggregateBackend_event_logs[P]>
  }




  export type backend_event_logsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: backend_event_logsWhereInput
    orderBy?: backend_event_logsOrderByWithAggregationInput | backend_event_logsOrderByWithAggregationInput[]
    by: Backend_event_logsScalarFieldEnum[] | Backend_event_logsScalarFieldEnum
    having?: backend_event_logsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Backend_event_logsCountAggregateInputType | true
    _min?: Backend_event_logsMinAggregateInputType
    _max?: Backend_event_logsMaxAggregateInputType
  }

  export type Backend_event_logsGroupByOutputType = {
    id: string
    event_name: string | null
    error_level: $Enums.backend_event_logs_error_level | null
    function_name: string | null
    user_id: string | null
    payload: JsonValue | null
    request_id: string | null
    created_at: Date
    created_commit_id: string
    _count: Backend_event_logsCountAggregateOutputType | null
    _min: Backend_event_logsMinAggregateOutputType | null
    _max: Backend_event_logsMaxAggregateOutputType | null
  }

  type GetBackend_event_logsGroupByPayload<T extends backend_event_logsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Backend_event_logsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Backend_event_logsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Backend_event_logsGroupByOutputType[P]>
            : GetScalarType<T[P], Backend_event_logsGroupByOutputType[P]>
        }
      >
    >


  export type backend_event_logsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    event_name?: boolean
    error_level?: boolean
    function_name?: boolean
    user_id?: boolean
    payload?: boolean
    request_id?: boolean
    created_at?: boolean
    created_commit_id?: boolean
  }, ExtArgs["result"]["backend_event_logs"]>

  export type backend_event_logsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    event_name?: boolean
    error_level?: boolean
    function_name?: boolean
    user_id?: boolean
    payload?: boolean
    request_id?: boolean
    created_at?: boolean
    created_commit_id?: boolean
  }, ExtArgs["result"]["backend_event_logs"]>

  export type backend_event_logsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    event_name?: boolean
    error_level?: boolean
    function_name?: boolean
    user_id?: boolean
    payload?: boolean
    request_id?: boolean
    created_at?: boolean
    created_commit_id?: boolean
  }, ExtArgs["result"]["backend_event_logs"]>

  export type backend_event_logsSelectScalar = {
    id?: boolean
    event_name?: boolean
    error_level?: boolean
    function_name?: boolean
    user_id?: boolean
    payload?: boolean
    request_id?: boolean
    created_at?: boolean
    created_commit_id?: boolean
  }

  export type backend_event_logsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "event_name" | "error_level" | "function_name" | "user_id" | "payload" | "request_id" | "created_at" | "created_commit_id", ExtArgs["result"]["backend_event_logs"]>

  export type $backend_event_logsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "backend_event_logs"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      event_name: string | null
      error_level: $Enums.backend_event_logs_error_level | null
      function_name: string | null
      user_id: string | null
      payload: Prisma.JsonValue | null
      request_id: string | null
      created_at: Date
      created_commit_id: string
    }, ExtArgs["result"]["backend_event_logs"]>
    composites: {}
  }

  type backend_event_logsGetPayload<S extends boolean | null | undefined | backend_event_logsDefaultArgs> = $Result.GetResult<Prisma.$backend_event_logsPayload, S>

  type backend_event_logsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<backend_event_logsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Backend_event_logsCountAggregateInputType | true
    }

  export interface backend_event_logsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['backend_event_logs'], meta: { name: 'backend_event_logs' } }
    /**
     * Find zero or one Backend_event_logs that matches the filter.
     * @param {backend_event_logsFindUniqueArgs} args - Arguments to find a Backend_event_logs
     * @example
     * // Get one Backend_event_logs
     * const backend_event_logs = await prisma.backend_event_logs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends backend_event_logsFindUniqueArgs>(args: SelectSubset<T, backend_event_logsFindUniqueArgs<ExtArgs>>): Prisma__backend_event_logsClient<$Result.GetResult<Prisma.$backend_event_logsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Backend_event_logs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {backend_event_logsFindUniqueOrThrowArgs} args - Arguments to find a Backend_event_logs
     * @example
     * // Get one Backend_event_logs
     * const backend_event_logs = await prisma.backend_event_logs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends backend_event_logsFindUniqueOrThrowArgs>(args: SelectSubset<T, backend_event_logsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__backend_event_logsClient<$Result.GetResult<Prisma.$backend_event_logsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Backend_event_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {backend_event_logsFindFirstArgs} args - Arguments to find a Backend_event_logs
     * @example
     * // Get one Backend_event_logs
     * const backend_event_logs = await prisma.backend_event_logs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends backend_event_logsFindFirstArgs>(args?: SelectSubset<T, backend_event_logsFindFirstArgs<ExtArgs>>): Prisma__backend_event_logsClient<$Result.GetResult<Prisma.$backend_event_logsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Backend_event_logs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {backend_event_logsFindFirstOrThrowArgs} args - Arguments to find a Backend_event_logs
     * @example
     * // Get one Backend_event_logs
     * const backend_event_logs = await prisma.backend_event_logs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends backend_event_logsFindFirstOrThrowArgs>(args?: SelectSubset<T, backend_event_logsFindFirstOrThrowArgs<ExtArgs>>): Prisma__backend_event_logsClient<$Result.GetResult<Prisma.$backend_event_logsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Backend_event_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {backend_event_logsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Backend_event_logs
     * const backend_event_logs = await prisma.backend_event_logs.findMany()
     * 
     * // Get first 10 Backend_event_logs
     * const backend_event_logs = await prisma.backend_event_logs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const backend_event_logsWithIdOnly = await prisma.backend_event_logs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends backend_event_logsFindManyArgs>(args?: SelectSubset<T, backend_event_logsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$backend_event_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Backend_event_logs.
     * @param {backend_event_logsCreateArgs} args - Arguments to create a Backend_event_logs.
     * @example
     * // Create one Backend_event_logs
     * const Backend_event_logs = await prisma.backend_event_logs.create({
     *   data: {
     *     // ... data to create a Backend_event_logs
     *   }
     * })
     * 
     */
    create<T extends backend_event_logsCreateArgs>(args: SelectSubset<T, backend_event_logsCreateArgs<ExtArgs>>): Prisma__backend_event_logsClient<$Result.GetResult<Prisma.$backend_event_logsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Backend_event_logs.
     * @param {backend_event_logsCreateManyArgs} args - Arguments to create many Backend_event_logs.
     * @example
     * // Create many Backend_event_logs
     * const backend_event_logs = await prisma.backend_event_logs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends backend_event_logsCreateManyArgs>(args?: SelectSubset<T, backend_event_logsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Backend_event_logs and returns the data saved in the database.
     * @param {backend_event_logsCreateManyAndReturnArgs} args - Arguments to create many Backend_event_logs.
     * @example
     * // Create many Backend_event_logs
     * const backend_event_logs = await prisma.backend_event_logs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Backend_event_logs and only return the `id`
     * const backend_event_logsWithIdOnly = await prisma.backend_event_logs.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends backend_event_logsCreateManyAndReturnArgs>(args?: SelectSubset<T, backend_event_logsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$backend_event_logsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Backend_event_logs.
     * @param {backend_event_logsDeleteArgs} args - Arguments to delete one Backend_event_logs.
     * @example
     * // Delete one Backend_event_logs
     * const Backend_event_logs = await prisma.backend_event_logs.delete({
     *   where: {
     *     // ... filter to delete one Backend_event_logs
     *   }
     * })
     * 
     */
    delete<T extends backend_event_logsDeleteArgs>(args: SelectSubset<T, backend_event_logsDeleteArgs<ExtArgs>>): Prisma__backend_event_logsClient<$Result.GetResult<Prisma.$backend_event_logsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Backend_event_logs.
     * @param {backend_event_logsUpdateArgs} args - Arguments to update one Backend_event_logs.
     * @example
     * // Update one Backend_event_logs
     * const backend_event_logs = await prisma.backend_event_logs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends backend_event_logsUpdateArgs>(args: SelectSubset<T, backend_event_logsUpdateArgs<ExtArgs>>): Prisma__backend_event_logsClient<$Result.GetResult<Prisma.$backend_event_logsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Backend_event_logs.
     * @param {backend_event_logsDeleteManyArgs} args - Arguments to filter Backend_event_logs to delete.
     * @example
     * // Delete a few Backend_event_logs
     * const { count } = await prisma.backend_event_logs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends backend_event_logsDeleteManyArgs>(args?: SelectSubset<T, backend_event_logsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Backend_event_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {backend_event_logsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Backend_event_logs
     * const backend_event_logs = await prisma.backend_event_logs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends backend_event_logsUpdateManyArgs>(args: SelectSubset<T, backend_event_logsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Backend_event_logs and returns the data updated in the database.
     * @param {backend_event_logsUpdateManyAndReturnArgs} args - Arguments to update many Backend_event_logs.
     * @example
     * // Update many Backend_event_logs
     * const backend_event_logs = await prisma.backend_event_logs.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Backend_event_logs and only return the `id`
     * const backend_event_logsWithIdOnly = await prisma.backend_event_logs.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends backend_event_logsUpdateManyAndReturnArgs>(args: SelectSubset<T, backend_event_logsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$backend_event_logsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Backend_event_logs.
     * @param {backend_event_logsUpsertArgs} args - Arguments to update or create a Backend_event_logs.
     * @example
     * // Update or create a Backend_event_logs
     * const backend_event_logs = await prisma.backend_event_logs.upsert({
     *   create: {
     *     // ... data to create a Backend_event_logs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Backend_event_logs we want to update
     *   }
     * })
     */
    upsert<T extends backend_event_logsUpsertArgs>(args: SelectSubset<T, backend_event_logsUpsertArgs<ExtArgs>>): Prisma__backend_event_logsClient<$Result.GetResult<Prisma.$backend_event_logsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Backend_event_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {backend_event_logsCountArgs} args - Arguments to filter Backend_event_logs to count.
     * @example
     * // Count the number of Backend_event_logs
     * const count = await prisma.backend_event_logs.count({
     *   where: {
     *     // ... the filter for the Backend_event_logs we want to count
     *   }
     * })
    **/
    count<T extends backend_event_logsCountArgs>(
      args?: Subset<T, backend_event_logsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Backend_event_logsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Backend_event_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Backend_event_logsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Backend_event_logsAggregateArgs>(args: Subset<T, Backend_event_logsAggregateArgs>): Prisma.PrismaPromise<GetBackend_event_logsAggregateType<T>>

    /**
     * Group by Backend_event_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {backend_event_logsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends backend_event_logsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: backend_event_logsGroupByArgs['orderBy'] }
        : { orderBy?: backend_event_logsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, backend_event_logsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBackend_event_logsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the backend_event_logs model
   */
  readonly fields: backend_event_logsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for backend_event_logs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__backend_event_logsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the backend_event_logs model
   */
  interface backend_event_logsFieldRefs {
    readonly id: FieldRef<"backend_event_logs", 'String'>
    readonly event_name: FieldRef<"backend_event_logs", 'String'>
    readonly error_level: FieldRef<"backend_event_logs", 'backend_event_logs_error_level'>
    readonly function_name: FieldRef<"backend_event_logs", 'String'>
    readonly user_id: FieldRef<"backend_event_logs", 'String'>
    readonly payload: FieldRef<"backend_event_logs", 'Json'>
    readonly request_id: FieldRef<"backend_event_logs", 'String'>
    readonly created_at: FieldRef<"backend_event_logs", 'DateTime'>
    readonly created_commit_id: FieldRef<"backend_event_logs", 'String'>
  }
    

  // Custom InputTypes
  /**
   * backend_event_logs findUnique
   */
  export type backend_event_logsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backend_event_logs
     */
    select?: backend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backend_event_logs
     */
    omit?: backend_event_logsOmit<ExtArgs> | null
    /**
     * Filter, which backend_event_logs to fetch.
     */
    where: backend_event_logsWhereUniqueInput
  }

  /**
   * backend_event_logs findUniqueOrThrow
   */
  export type backend_event_logsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backend_event_logs
     */
    select?: backend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backend_event_logs
     */
    omit?: backend_event_logsOmit<ExtArgs> | null
    /**
     * Filter, which backend_event_logs to fetch.
     */
    where: backend_event_logsWhereUniqueInput
  }

  /**
   * backend_event_logs findFirst
   */
  export type backend_event_logsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backend_event_logs
     */
    select?: backend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backend_event_logs
     */
    omit?: backend_event_logsOmit<ExtArgs> | null
    /**
     * Filter, which backend_event_logs to fetch.
     */
    where?: backend_event_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of backend_event_logs to fetch.
     */
    orderBy?: backend_event_logsOrderByWithRelationInput | backend_event_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for backend_event_logs.
     */
    cursor?: backend_event_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` backend_event_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` backend_event_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of backend_event_logs.
     */
    distinct?: Backend_event_logsScalarFieldEnum | Backend_event_logsScalarFieldEnum[]
  }

  /**
   * backend_event_logs findFirstOrThrow
   */
  export type backend_event_logsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backend_event_logs
     */
    select?: backend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backend_event_logs
     */
    omit?: backend_event_logsOmit<ExtArgs> | null
    /**
     * Filter, which backend_event_logs to fetch.
     */
    where?: backend_event_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of backend_event_logs to fetch.
     */
    orderBy?: backend_event_logsOrderByWithRelationInput | backend_event_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for backend_event_logs.
     */
    cursor?: backend_event_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` backend_event_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` backend_event_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of backend_event_logs.
     */
    distinct?: Backend_event_logsScalarFieldEnum | Backend_event_logsScalarFieldEnum[]
  }

  /**
   * backend_event_logs findMany
   */
  export type backend_event_logsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backend_event_logs
     */
    select?: backend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backend_event_logs
     */
    omit?: backend_event_logsOmit<ExtArgs> | null
    /**
     * Filter, which backend_event_logs to fetch.
     */
    where?: backend_event_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of backend_event_logs to fetch.
     */
    orderBy?: backend_event_logsOrderByWithRelationInput | backend_event_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing backend_event_logs.
     */
    cursor?: backend_event_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` backend_event_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` backend_event_logs.
     */
    skip?: number
    distinct?: Backend_event_logsScalarFieldEnum | Backend_event_logsScalarFieldEnum[]
  }

  /**
   * backend_event_logs create
   */
  export type backend_event_logsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backend_event_logs
     */
    select?: backend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backend_event_logs
     */
    omit?: backend_event_logsOmit<ExtArgs> | null
    /**
     * The data needed to create a backend_event_logs.
     */
    data: XOR<backend_event_logsCreateInput, backend_event_logsUncheckedCreateInput>
  }

  /**
   * backend_event_logs createMany
   */
  export type backend_event_logsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many backend_event_logs.
     */
    data: backend_event_logsCreateManyInput | backend_event_logsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * backend_event_logs createManyAndReturn
   */
  export type backend_event_logsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backend_event_logs
     */
    select?: backend_event_logsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the backend_event_logs
     */
    omit?: backend_event_logsOmit<ExtArgs> | null
    /**
     * The data used to create many backend_event_logs.
     */
    data: backend_event_logsCreateManyInput | backend_event_logsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * backend_event_logs update
   */
  export type backend_event_logsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backend_event_logs
     */
    select?: backend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backend_event_logs
     */
    omit?: backend_event_logsOmit<ExtArgs> | null
    /**
     * The data needed to update a backend_event_logs.
     */
    data: XOR<backend_event_logsUpdateInput, backend_event_logsUncheckedUpdateInput>
    /**
     * Choose, which backend_event_logs to update.
     */
    where: backend_event_logsWhereUniqueInput
  }

  /**
   * backend_event_logs updateMany
   */
  export type backend_event_logsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update backend_event_logs.
     */
    data: XOR<backend_event_logsUpdateManyMutationInput, backend_event_logsUncheckedUpdateManyInput>
    /**
     * Filter which backend_event_logs to update
     */
    where?: backend_event_logsWhereInput
    /**
     * Limit how many backend_event_logs to update.
     */
    limit?: number
  }

  /**
   * backend_event_logs updateManyAndReturn
   */
  export type backend_event_logsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backend_event_logs
     */
    select?: backend_event_logsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the backend_event_logs
     */
    omit?: backend_event_logsOmit<ExtArgs> | null
    /**
     * The data used to update backend_event_logs.
     */
    data: XOR<backend_event_logsUpdateManyMutationInput, backend_event_logsUncheckedUpdateManyInput>
    /**
     * Filter which backend_event_logs to update
     */
    where?: backend_event_logsWhereInput
    /**
     * Limit how many backend_event_logs to update.
     */
    limit?: number
  }

  /**
   * backend_event_logs upsert
   */
  export type backend_event_logsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backend_event_logs
     */
    select?: backend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backend_event_logs
     */
    omit?: backend_event_logsOmit<ExtArgs> | null
    /**
     * The filter to search for the backend_event_logs to update in case it exists.
     */
    where: backend_event_logsWhereUniqueInput
    /**
     * In case the backend_event_logs found by the `where` argument doesn't exist, create a new backend_event_logs with this data.
     */
    create: XOR<backend_event_logsCreateInput, backend_event_logsUncheckedCreateInput>
    /**
     * In case the backend_event_logs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<backend_event_logsUpdateInput, backend_event_logsUncheckedUpdateInput>
  }

  /**
   * backend_event_logs delete
   */
  export type backend_event_logsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backend_event_logs
     */
    select?: backend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backend_event_logs
     */
    omit?: backend_event_logsOmit<ExtArgs> | null
    /**
     * Filter which backend_event_logs to delete.
     */
    where: backend_event_logsWhereUniqueInput
  }

  /**
   * backend_event_logs deleteMany
   */
  export type backend_event_logsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which backend_event_logs to delete
     */
    where?: backend_event_logsWhereInput
    /**
     * Limit how many backend_event_logs to delete.
     */
    limit?: number
  }

  /**
   * backend_event_logs without action
   */
  export type backend_event_logsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backend_event_logs
     */
    select?: backend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backend_event_logs
     */
    omit?: backend_event_logsOmit<ExtArgs> | null
  }


  /**
   * Model external_api_logs
   */

  export type AggregateExternal_api_logs = {
    _count: External_api_logsCountAggregateOutputType | null
    _avg: External_api_logsAvgAggregateOutputType | null
    _sum: External_api_logsSumAggregateOutputType | null
    _min: External_api_logsMinAggregateOutputType | null
    _max: External_api_logsMaxAggregateOutputType | null
  }

  export type External_api_logsAvgAggregateOutputType = {
    status_code: number | null
    response_time_ms: number | null
  }

  export type External_api_logsSumAggregateOutputType = {
    status_code: number | null
    response_time_ms: number | null
  }

  export type External_api_logsMinAggregateOutputType = {
    id: string | null
    request_id: string | null
    function_name: string | null
    api_name: string | null
    endpoint: string | null
    status_code: number | null
    error_message: string | null
    response_time_ms: number | null
    user_id: string | null
    created_at: Date | null
    created_commit_id: string | null
  }

  export type External_api_logsMaxAggregateOutputType = {
    id: string | null
    request_id: string | null
    function_name: string | null
    api_name: string | null
    endpoint: string | null
    status_code: number | null
    error_message: string | null
    response_time_ms: number | null
    user_id: string | null
    created_at: Date | null
    created_commit_id: string | null
  }

  export type External_api_logsCountAggregateOutputType = {
    id: number
    request_id: number
    function_name: number
    api_name: number
    endpoint: number
    request_payload: number
    response_payload: number
    status_code: number
    error_message: number
    response_time_ms: number
    user_id: number
    created_at: number
    created_commit_id: number
    _all: number
  }


  export type External_api_logsAvgAggregateInputType = {
    status_code?: true
    response_time_ms?: true
  }

  export type External_api_logsSumAggregateInputType = {
    status_code?: true
    response_time_ms?: true
  }

  export type External_api_logsMinAggregateInputType = {
    id?: true
    request_id?: true
    function_name?: true
    api_name?: true
    endpoint?: true
    status_code?: true
    error_message?: true
    response_time_ms?: true
    user_id?: true
    created_at?: true
    created_commit_id?: true
  }

  export type External_api_logsMaxAggregateInputType = {
    id?: true
    request_id?: true
    function_name?: true
    api_name?: true
    endpoint?: true
    status_code?: true
    error_message?: true
    response_time_ms?: true
    user_id?: true
    created_at?: true
    created_commit_id?: true
  }

  export type External_api_logsCountAggregateInputType = {
    id?: true
    request_id?: true
    function_name?: true
    api_name?: true
    endpoint?: true
    request_payload?: true
    response_payload?: true
    status_code?: true
    error_message?: true
    response_time_ms?: true
    user_id?: true
    created_at?: true
    created_commit_id?: true
    _all?: true
  }

  export type External_api_logsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which external_api_logs to aggregate.
     */
    where?: external_api_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of external_api_logs to fetch.
     */
    orderBy?: external_api_logsOrderByWithRelationInput | external_api_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: external_api_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` external_api_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` external_api_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned external_api_logs
    **/
    _count?: true | External_api_logsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: External_api_logsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: External_api_logsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: External_api_logsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: External_api_logsMaxAggregateInputType
  }

  export type GetExternal_api_logsAggregateType<T extends External_api_logsAggregateArgs> = {
        [P in keyof T & keyof AggregateExternal_api_logs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExternal_api_logs[P]>
      : GetScalarType<T[P], AggregateExternal_api_logs[P]>
  }




  export type external_api_logsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: external_api_logsWhereInput
    orderBy?: external_api_logsOrderByWithAggregationInput | external_api_logsOrderByWithAggregationInput[]
    by: External_api_logsScalarFieldEnum[] | External_api_logsScalarFieldEnum
    having?: external_api_logsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: External_api_logsCountAggregateInputType | true
    _avg?: External_api_logsAvgAggregateInputType
    _sum?: External_api_logsSumAggregateInputType
    _min?: External_api_logsMinAggregateInputType
    _max?: External_api_logsMaxAggregateInputType
  }

  export type External_api_logsGroupByOutputType = {
    id: string
    request_id: string | null
    function_name: string | null
    api_name: string | null
    endpoint: string | null
    request_payload: JsonValue | null
    response_payload: JsonValue | null
    status_code: number | null
    error_message: string | null
    response_time_ms: number | null
    user_id: string | null
    created_at: Date
    created_commit_id: string
    _count: External_api_logsCountAggregateOutputType | null
    _avg: External_api_logsAvgAggregateOutputType | null
    _sum: External_api_logsSumAggregateOutputType | null
    _min: External_api_logsMinAggregateOutputType | null
    _max: External_api_logsMaxAggregateOutputType | null
  }

  type GetExternal_api_logsGroupByPayload<T extends external_api_logsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<External_api_logsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof External_api_logsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], External_api_logsGroupByOutputType[P]>
            : GetScalarType<T[P], External_api_logsGroupByOutputType[P]>
        }
      >
    >


  export type external_api_logsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    request_id?: boolean
    function_name?: boolean
    api_name?: boolean
    endpoint?: boolean
    request_payload?: boolean
    response_payload?: boolean
    status_code?: boolean
    error_message?: boolean
    response_time_ms?: boolean
    user_id?: boolean
    created_at?: boolean
    created_commit_id?: boolean
  }, ExtArgs["result"]["external_api_logs"]>

  export type external_api_logsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    request_id?: boolean
    function_name?: boolean
    api_name?: boolean
    endpoint?: boolean
    request_payload?: boolean
    response_payload?: boolean
    status_code?: boolean
    error_message?: boolean
    response_time_ms?: boolean
    user_id?: boolean
    created_at?: boolean
    created_commit_id?: boolean
  }, ExtArgs["result"]["external_api_logs"]>

  export type external_api_logsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    request_id?: boolean
    function_name?: boolean
    api_name?: boolean
    endpoint?: boolean
    request_payload?: boolean
    response_payload?: boolean
    status_code?: boolean
    error_message?: boolean
    response_time_ms?: boolean
    user_id?: boolean
    created_at?: boolean
    created_commit_id?: boolean
  }, ExtArgs["result"]["external_api_logs"]>

  export type external_api_logsSelectScalar = {
    id?: boolean
    request_id?: boolean
    function_name?: boolean
    api_name?: boolean
    endpoint?: boolean
    request_payload?: boolean
    response_payload?: boolean
    status_code?: boolean
    error_message?: boolean
    response_time_ms?: boolean
    user_id?: boolean
    created_at?: boolean
    created_commit_id?: boolean
  }

  export type external_api_logsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "request_id" | "function_name" | "api_name" | "endpoint" | "request_payload" | "response_payload" | "status_code" | "error_message" | "response_time_ms" | "user_id" | "created_at" | "created_commit_id", ExtArgs["result"]["external_api_logs"]>

  export type $external_api_logsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "external_api_logs"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      request_id: string | null
      function_name: string | null
      api_name: string | null
      endpoint: string | null
      request_payload: Prisma.JsonValue | null
      response_payload: Prisma.JsonValue | null
      status_code: number | null
      error_message: string | null
      response_time_ms: number | null
      user_id: string | null
      created_at: Date
      created_commit_id: string
    }, ExtArgs["result"]["external_api_logs"]>
    composites: {}
  }

  type external_api_logsGetPayload<S extends boolean | null | undefined | external_api_logsDefaultArgs> = $Result.GetResult<Prisma.$external_api_logsPayload, S>

  type external_api_logsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<external_api_logsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: External_api_logsCountAggregateInputType | true
    }

  export interface external_api_logsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['external_api_logs'], meta: { name: 'external_api_logs' } }
    /**
     * Find zero or one External_api_logs that matches the filter.
     * @param {external_api_logsFindUniqueArgs} args - Arguments to find a External_api_logs
     * @example
     * // Get one External_api_logs
     * const external_api_logs = await prisma.external_api_logs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends external_api_logsFindUniqueArgs>(args: SelectSubset<T, external_api_logsFindUniqueArgs<ExtArgs>>): Prisma__external_api_logsClient<$Result.GetResult<Prisma.$external_api_logsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one External_api_logs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {external_api_logsFindUniqueOrThrowArgs} args - Arguments to find a External_api_logs
     * @example
     * // Get one External_api_logs
     * const external_api_logs = await prisma.external_api_logs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends external_api_logsFindUniqueOrThrowArgs>(args: SelectSubset<T, external_api_logsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__external_api_logsClient<$Result.GetResult<Prisma.$external_api_logsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first External_api_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {external_api_logsFindFirstArgs} args - Arguments to find a External_api_logs
     * @example
     * // Get one External_api_logs
     * const external_api_logs = await prisma.external_api_logs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends external_api_logsFindFirstArgs>(args?: SelectSubset<T, external_api_logsFindFirstArgs<ExtArgs>>): Prisma__external_api_logsClient<$Result.GetResult<Prisma.$external_api_logsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first External_api_logs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {external_api_logsFindFirstOrThrowArgs} args - Arguments to find a External_api_logs
     * @example
     * // Get one External_api_logs
     * const external_api_logs = await prisma.external_api_logs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends external_api_logsFindFirstOrThrowArgs>(args?: SelectSubset<T, external_api_logsFindFirstOrThrowArgs<ExtArgs>>): Prisma__external_api_logsClient<$Result.GetResult<Prisma.$external_api_logsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more External_api_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {external_api_logsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all External_api_logs
     * const external_api_logs = await prisma.external_api_logs.findMany()
     * 
     * // Get first 10 External_api_logs
     * const external_api_logs = await prisma.external_api_logs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const external_api_logsWithIdOnly = await prisma.external_api_logs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends external_api_logsFindManyArgs>(args?: SelectSubset<T, external_api_logsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$external_api_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a External_api_logs.
     * @param {external_api_logsCreateArgs} args - Arguments to create a External_api_logs.
     * @example
     * // Create one External_api_logs
     * const External_api_logs = await prisma.external_api_logs.create({
     *   data: {
     *     // ... data to create a External_api_logs
     *   }
     * })
     * 
     */
    create<T extends external_api_logsCreateArgs>(args: SelectSubset<T, external_api_logsCreateArgs<ExtArgs>>): Prisma__external_api_logsClient<$Result.GetResult<Prisma.$external_api_logsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many External_api_logs.
     * @param {external_api_logsCreateManyArgs} args - Arguments to create many External_api_logs.
     * @example
     * // Create many External_api_logs
     * const external_api_logs = await prisma.external_api_logs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends external_api_logsCreateManyArgs>(args?: SelectSubset<T, external_api_logsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many External_api_logs and returns the data saved in the database.
     * @param {external_api_logsCreateManyAndReturnArgs} args - Arguments to create many External_api_logs.
     * @example
     * // Create many External_api_logs
     * const external_api_logs = await prisma.external_api_logs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many External_api_logs and only return the `id`
     * const external_api_logsWithIdOnly = await prisma.external_api_logs.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends external_api_logsCreateManyAndReturnArgs>(args?: SelectSubset<T, external_api_logsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$external_api_logsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a External_api_logs.
     * @param {external_api_logsDeleteArgs} args - Arguments to delete one External_api_logs.
     * @example
     * // Delete one External_api_logs
     * const External_api_logs = await prisma.external_api_logs.delete({
     *   where: {
     *     // ... filter to delete one External_api_logs
     *   }
     * })
     * 
     */
    delete<T extends external_api_logsDeleteArgs>(args: SelectSubset<T, external_api_logsDeleteArgs<ExtArgs>>): Prisma__external_api_logsClient<$Result.GetResult<Prisma.$external_api_logsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one External_api_logs.
     * @param {external_api_logsUpdateArgs} args - Arguments to update one External_api_logs.
     * @example
     * // Update one External_api_logs
     * const external_api_logs = await prisma.external_api_logs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends external_api_logsUpdateArgs>(args: SelectSubset<T, external_api_logsUpdateArgs<ExtArgs>>): Prisma__external_api_logsClient<$Result.GetResult<Prisma.$external_api_logsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more External_api_logs.
     * @param {external_api_logsDeleteManyArgs} args - Arguments to filter External_api_logs to delete.
     * @example
     * // Delete a few External_api_logs
     * const { count } = await prisma.external_api_logs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends external_api_logsDeleteManyArgs>(args?: SelectSubset<T, external_api_logsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more External_api_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {external_api_logsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many External_api_logs
     * const external_api_logs = await prisma.external_api_logs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends external_api_logsUpdateManyArgs>(args: SelectSubset<T, external_api_logsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more External_api_logs and returns the data updated in the database.
     * @param {external_api_logsUpdateManyAndReturnArgs} args - Arguments to update many External_api_logs.
     * @example
     * // Update many External_api_logs
     * const external_api_logs = await prisma.external_api_logs.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more External_api_logs and only return the `id`
     * const external_api_logsWithIdOnly = await prisma.external_api_logs.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends external_api_logsUpdateManyAndReturnArgs>(args: SelectSubset<T, external_api_logsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$external_api_logsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one External_api_logs.
     * @param {external_api_logsUpsertArgs} args - Arguments to update or create a External_api_logs.
     * @example
     * // Update or create a External_api_logs
     * const external_api_logs = await prisma.external_api_logs.upsert({
     *   create: {
     *     // ... data to create a External_api_logs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the External_api_logs we want to update
     *   }
     * })
     */
    upsert<T extends external_api_logsUpsertArgs>(args: SelectSubset<T, external_api_logsUpsertArgs<ExtArgs>>): Prisma__external_api_logsClient<$Result.GetResult<Prisma.$external_api_logsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of External_api_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {external_api_logsCountArgs} args - Arguments to filter External_api_logs to count.
     * @example
     * // Count the number of External_api_logs
     * const count = await prisma.external_api_logs.count({
     *   where: {
     *     // ... the filter for the External_api_logs we want to count
     *   }
     * })
    **/
    count<T extends external_api_logsCountArgs>(
      args?: Subset<T, external_api_logsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], External_api_logsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a External_api_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {External_api_logsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends External_api_logsAggregateArgs>(args: Subset<T, External_api_logsAggregateArgs>): Prisma.PrismaPromise<GetExternal_api_logsAggregateType<T>>

    /**
     * Group by External_api_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {external_api_logsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends external_api_logsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: external_api_logsGroupByArgs['orderBy'] }
        : { orderBy?: external_api_logsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, external_api_logsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExternal_api_logsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the external_api_logs model
   */
  readonly fields: external_api_logsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for external_api_logs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__external_api_logsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the external_api_logs model
   */
  interface external_api_logsFieldRefs {
    readonly id: FieldRef<"external_api_logs", 'String'>
    readonly request_id: FieldRef<"external_api_logs", 'String'>
    readonly function_name: FieldRef<"external_api_logs", 'String'>
    readonly api_name: FieldRef<"external_api_logs", 'String'>
    readonly endpoint: FieldRef<"external_api_logs", 'String'>
    readonly request_payload: FieldRef<"external_api_logs", 'Json'>
    readonly response_payload: FieldRef<"external_api_logs", 'Json'>
    readonly status_code: FieldRef<"external_api_logs", 'Int'>
    readonly error_message: FieldRef<"external_api_logs", 'String'>
    readonly response_time_ms: FieldRef<"external_api_logs", 'Int'>
    readonly user_id: FieldRef<"external_api_logs", 'String'>
    readonly created_at: FieldRef<"external_api_logs", 'DateTime'>
    readonly created_commit_id: FieldRef<"external_api_logs", 'String'>
  }
    

  // Custom InputTypes
  /**
   * external_api_logs findUnique
   */
  export type external_api_logsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the external_api_logs
     */
    select?: external_api_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the external_api_logs
     */
    omit?: external_api_logsOmit<ExtArgs> | null
    /**
     * Filter, which external_api_logs to fetch.
     */
    where: external_api_logsWhereUniqueInput
  }

  /**
   * external_api_logs findUniqueOrThrow
   */
  export type external_api_logsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the external_api_logs
     */
    select?: external_api_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the external_api_logs
     */
    omit?: external_api_logsOmit<ExtArgs> | null
    /**
     * Filter, which external_api_logs to fetch.
     */
    where: external_api_logsWhereUniqueInput
  }

  /**
   * external_api_logs findFirst
   */
  export type external_api_logsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the external_api_logs
     */
    select?: external_api_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the external_api_logs
     */
    omit?: external_api_logsOmit<ExtArgs> | null
    /**
     * Filter, which external_api_logs to fetch.
     */
    where?: external_api_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of external_api_logs to fetch.
     */
    orderBy?: external_api_logsOrderByWithRelationInput | external_api_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for external_api_logs.
     */
    cursor?: external_api_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` external_api_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` external_api_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of external_api_logs.
     */
    distinct?: External_api_logsScalarFieldEnum | External_api_logsScalarFieldEnum[]
  }

  /**
   * external_api_logs findFirstOrThrow
   */
  export type external_api_logsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the external_api_logs
     */
    select?: external_api_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the external_api_logs
     */
    omit?: external_api_logsOmit<ExtArgs> | null
    /**
     * Filter, which external_api_logs to fetch.
     */
    where?: external_api_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of external_api_logs to fetch.
     */
    orderBy?: external_api_logsOrderByWithRelationInput | external_api_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for external_api_logs.
     */
    cursor?: external_api_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` external_api_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` external_api_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of external_api_logs.
     */
    distinct?: External_api_logsScalarFieldEnum | External_api_logsScalarFieldEnum[]
  }

  /**
   * external_api_logs findMany
   */
  export type external_api_logsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the external_api_logs
     */
    select?: external_api_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the external_api_logs
     */
    omit?: external_api_logsOmit<ExtArgs> | null
    /**
     * Filter, which external_api_logs to fetch.
     */
    where?: external_api_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of external_api_logs to fetch.
     */
    orderBy?: external_api_logsOrderByWithRelationInput | external_api_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing external_api_logs.
     */
    cursor?: external_api_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` external_api_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` external_api_logs.
     */
    skip?: number
    distinct?: External_api_logsScalarFieldEnum | External_api_logsScalarFieldEnum[]
  }

  /**
   * external_api_logs create
   */
  export type external_api_logsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the external_api_logs
     */
    select?: external_api_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the external_api_logs
     */
    omit?: external_api_logsOmit<ExtArgs> | null
    /**
     * The data needed to create a external_api_logs.
     */
    data: XOR<external_api_logsCreateInput, external_api_logsUncheckedCreateInput>
  }

  /**
   * external_api_logs createMany
   */
  export type external_api_logsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many external_api_logs.
     */
    data: external_api_logsCreateManyInput | external_api_logsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * external_api_logs createManyAndReturn
   */
  export type external_api_logsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the external_api_logs
     */
    select?: external_api_logsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the external_api_logs
     */
    omit?: external_api_logsOmit<ExtArgs> | null
    /**
     * The data used to create many external_api_logs.
     */
    data: external_api_logsCreateManyInput | external_api_logsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * external_api_logs update
   */
  export type external_api_logsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the external_api_logs
     */
    select?: external_api_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the external_api_logs
     */
    omit?: external_api_logsOmit<ExtArgs> | null
    /**
     * The data needed to update a external_api_logs.
     */
    data: XOR<external_api_logsUpdateInput, external_api_logsUncheckedUpdateInput>
    /**
     * Choose, which external_api_logs to update.
     */
    where: external_api_logsWhereUniqueInput
  }

  /**
   * external_api_logs updateMany
   */
  export type external_api_logsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update external_api_logs.
     */
    data: XOR<external_api_logsUpdateManyMutationInput, external_api_logsUncheckedUpdateManyInput>
    /**
     * Filter which external_api_logs to update
     */
    where?: external_api_logsWhereInput
    /**
     * Limit how many external_api_logs to update.
     */
    limit?: number
  }

  /**
   * external_api_logs updateManyAndReturn
   */
  export type external_api_logsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the external_api_logs
     */
    select?: external_api_logsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the external_api_logs
     */
    omit?: external_api_logsOmit<ExtArgs> | null
    /**
     * The data used to update external_api_logs.
     */
    data: XOR<external_api_logsUpdateManyMutationInput, external_api_logsUncheckedUpdateManyInput>
    /**
     * Filter which external_api_logs to update
     */
    where?: external_api_logsWhereInput
    /**
     * Limit how many external_api_logs to update.
     */
    limit?: number
  }

  /**
   * external_api_logs upsert
   */
  export type external_api_logsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the external_api_logs
     */
    select?: external_api_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the external_api_logs
     */
    omit?: external_api_logsOmit<ExtArgs> | null
    /**
     * The filter to search for the external_api_logs to update in case it exists.
     */
    where: external_api_logsWhereUniqueInput
    /**
     * In case the external_api_logs found by the `where` argument doesn't exist, create a new external_api_logs with this data.
     */
    create: XOR<external_api_logsCreateInput, external_api_logsUncheckedCreateInput>
    /**
     * In case the external_api_logs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<external_api_logsUpdateInput, external_api_logsUncheckedUpdateInput>
  }

  /**
   * external_api_logs delete
   */
  export type external_api_logsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the external_api_logs
     */
    select?: external_api_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the external_api_logs
     */
    omit?: external_api_logsOmit<ExtArgs> | null
    /**
     * Filter which external_api_logs to delete.
     */
    where: external_api_logsWhereUniqueInput
  }

  /**
   * external_api_logs deleteMany
   */
  export type external_api_logsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which external_api_logs to delete
     */
    where?: external_api_logsWhereInput
    /**
     * Limit how many external_api_logs to delete.
     */
    limit?: number
  }

  /**
   * external_api_logs without action
   */
  export type external_api_logsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the external_api_logs
     */
    select?: external_api_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the external_api_logs
     */
    omit?: external_api_logsOmit<ExtArgs> | null
  }


  /**
   * Model frontend_event_logs
   */

  export type AggregateFrontend_event_logs = {
    _count: Frontend_event_logsCountAggregateOutputType | null
    _min: Frontend_event_logsMinAggregateOutputType | null
    _max: Frontend_event_logsMaxAggregateOutputType | null
  }

  export type Frontend_event_logsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    event_name: string | null
    error_level: $Enums.frontend_event_logs_error_level | null
    screen_name: string | null
    payload: string | null
    created_at: Date | null
    created_app_version: string | null
    created_commit_id: string | null
  }

  export type Frontend_event_logsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    event_name: string | null
    error_level: $Enums.frontend_event_logs_error_level | null
    screen_name: string | null
    payload: string | null
    created_at: Date | null
    created_app_version: string | null
    created_commit_id: string | null
  }

  export type Frontend_event_logsCountAggregateOutputType = {
    id: number
    user_id: number
    event_name: number
    error_level: number
    screen_name: number
    payload: number
    created_at: number
    created_app_version: number
    created_commit_id: number
    _all: number
  }


  export type Frontend_event_logsMinAggregateInputType = {
    id?: true
    user_id?: true
    event_name?: true
    error_level?: true
    screen_name?: true
    payload?: true
    created_at?: true
    created_app_version?: true
    created_commit_id?: true
  }

  export type Frontend_event_logsMaxAggregateInputType = {
    id?: true
    user_id?: true
    event_name?: true
    error_level?: true
    screen_name?: true
    payload?: true
    created_at?: true
    created_app_version?: true
    created_commit_id?: true
  }

  export type Frontend_event_logsCountAggregateInputType = {
    id?: true
    user_id?: true
    event_name?: true
    error_level?: true
    screen_name?: true
    payload?: true
    created_at?: true
    created_app_version?: true
    created_commit_id?: true
    _all?: true
  }

  export type Frontend_event_logsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which frontend_event_logs to aggregate.
     */
    where?: frontend_event_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of frontend_event_logs to fetch.
     */
    orderBy?: frontend_event_logsOrderByWithRelationInput | frontend_event_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: frontend_event_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` frontend_event_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` frontend_event_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned frontend_event_logs
    **/
    _count?: true | Frontend_event_logsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Frontend_event_logsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Frontend_event_logsMaxAggregateInputType
  }

  export type GetFrontend_event_logsAggregateType<T extends Frontend_event_logsAggregateArgs> = {
        [P in keyof T & keyof AggregateFrontend_event_logs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFrontend_event_logs[P]>
      : GetScalarType<T[P], AggregateFrontend_event_logs[P]>
  }




  export type frontend_event_logsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: frontend_event_logsWhereInput
    orderBy?: frontend_event_logsOrderByWithAggregationInput | frontend_event_logsOrderByWithAggregationInput[]
    by: Frontend_event_logsScalarFieldEnum[] | Frontend_event_logsScalarFieldEnum
    having?: frontend_event_logsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Frontend_event_logsCountAggregateInputType | true
    _min?: Frontend_event_logsMinAggregateInputType
    _max?: Frontend_event_logsMaxAggregateInputType
  }

  export type Frontend_event_logsGroupByOutputType = {
    id: string
    user_id: string | null
    event_name: string | null
    error_level: $Enums.frontend_event_logs_error_level | null
    screen_name: string | null
    payload: string | null
    created_at: Date
    created_app_version: string
    created_commit_id: string
    _count: Frontend_event_logsCountAggregateOutputType | null
    _min: Frontend_event_logsMinAggregateOutputType | null
    _max: Frontend_event_logsMaxAggregateOutputType | null
  }

  type GetFrontend_event_logsGroupByPayload<T extends frontend_event_logsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Frontend_event_logsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Frontend_event_logsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Frontend_event_logsGroupByOutputType[P]>
            : GetScalarType<T[P], Frontend_event_logsGroupByOutputType[P]>
        }
      >
    >


  export type frontend_event_logsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    event_name?: boolean
    error_level?: boolean
    screen_name?: boolean
    payload?: boolean
    created_at?: boolean
    created_app_version?: boolean
    created_commit_id?: boolean
  }, ExtArgs["result"]["frontend_event_logs"]>

  export type frontend_event_logsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    event_name?: boolean
    error_level?: boolean
    screen_name?: boolean
    payload?: boolean
    created_at?: boolean
    created_app_version?: boolean
    created_commit_id?: boolean
  }, ExtArgs["result"]["frontend_event_logs"]>

  export type frontend_event_logsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    event_name?: boolean
    error_level?: boolean
    screen_name?: boolean
    payload?: boolean
    created_at?: boolean
    created_app_version?: boolean
    created_commit_id?: boolean
  }, ExtArgs["result"]["frontend_event_logs"]>

  export type frontend_event_logsSelectScalar = {
    id?: boolean
    user_id?: boolean
    event_name?: boolean
    error_level?: boolean
    screen_name?: boolean
    payload?: boolean
    created_at?: boolean
    created_app_version?: boolean
    created_commit_id?: boolean
  }

  export type frontend_event_logsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "event_name" | "error_level" | "screen_name" | "payload" | "created_at" | "created_app_version" | "created_commit_id", ExtArgs["result"]["frontend_event_logs"]>

  export type $frontend_event_logsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "frontend_event_logs"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string | null
      event_name: string | null
      error_level: $Enums.frontend_event_logs_error_level | null
      screen_name: string | null
      payload: string | null
      created_at: Date
      created_app_version: string
      created_commit_id: string
    }, ExtArgs["result"]["frontend_event_logs"]>
    composites: {}
  }

  type frontend_event_logsGetPayload<S extends boolean | null | undefined | frontend_event_logsDefaultArgs> = $Result.GetResult<Prisma.$frontend_event_logsPayload, S>

  type frontend_event_logsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<frontend_event_logsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Frontend_event_logsCountAggregateInputType | true
    }

  export interface frontend_event_logsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['frontend_event_logs'], meta: { name: 'frontend_event_logs' } }
    /**
     * Find zero or one Frontend_event_logs that matches the filter.
     * @param {frontend_event_logsFindUniqueArgs} args - Arguments to find a Frontend_event_logs
     * @example
     * // Get one Frontend_event_logs
     * const frontend_event_logs = await prisma.frontend_event_logs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends frontend_event_logsFindUniqueArgs>(args: SelectSubset<T, frontend_event_logsFindUniqueArgs<ExtArgs>>): Prisma__frontend_event_logsClient<$Result.GetResult<Prisma.$frontend_event_logsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Frontend_event_logs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {frontend_event_logsFindUniqueOrThrowArgs} args - Arguments to find a Frontend_event_logs
     * @example
     * // Get one Frontend_event_logs
     * const frontend_event_logs = await prisma.frontend_event_logs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends frontend_event_logsFindUniqueOrThrowArgs>(args: SelectSubset<T, frontend_event_logsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__frontend_event_logsClient<$Result.GetResult<Prisma.$frontend_event_logsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Frontend_event_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {frontend_event_logsFindFirstArgs} args - Arguments to find a Frontend_event_logs
     * @example
     * // Get one Frontend_event_logs
     * const frontend_event_logs = await prisma.frontend_event_logs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends frontend_event_logsFindFirstArgs>(args?: SelectSubset<T, frontend_event_logsFindFirstArgs<ExtArgs>>): Prisma__frontend_event_logsClient<$Result.GetResult<Prisma.$frontend_event_logsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Frontend_event_logs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {frontend_event_logsFindFirstOrThrowArgs} args - Arguments to find a Frontend_event_logs
     * @example
     * // Get one Frontend_event_logs
     * const frontend_event_logs = await prisma.frontend_event_logs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends frontend_event_logsFindFirstOrThrowArgs>(args?: SelectSubset<T, frontend_event_logsFindFirstOrThrowArgs<ExtArgs>>): Prisma__frontend_event_logsClient<$Result.GetResult<Prisma.$frontend_event_logsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Frontend_event_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {frontend_event_logsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Frontend_event_logs
     * const frontend_event_logs = await prisma.frontend_event_logs.findMany()
     * 
     * // Get first 10 Frontend_event_logs
     * const frontend_event_logs = await prisma.frontend_event_logs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const frontend_event_logsWithIdOnly = await prisma.frontend_event_logs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends frontend_event_logsFindManyArgs>(args?: SelectSubset<T, frontend_event_logsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$frontend_event_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Frontend_event_logs.
     * @param {frontend_event_logsCreateArgs} args - Arguments to create a Frontend_event_logs.
     * @example
     * // Create one Frontend_event_logs
     * const Frontend_event_logs = await prisma.frontend_event_logs.create({
     *   data: {
     *     // ... data to create a Frontend_event_logs
     *   }
     * })
     * 
     */
    create<T extends frontend_event_logsCreateArgs>(args: SelectSubset<T, frontend_event_logsCreateArgs<ExtArgs>>): Prisma__frontend_event_logsClient<$Result.GetResult<Prisma.$frontend_event_logsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Frontend_event_logs.
     * @param {frontend_event_logsCreateManyArgs} args - Arguments to create many Frontend_event_logs.
     * @example
     * // Create many Frontend_event_logs
     * const frontend_event_logs = await prisma.frontend_event_logs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends frontend_event_logsCreateManyArgs>(args?: SelectSubset<T, frontend_event_logsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Frontend_event_logs and returns the data saved in the database.
     * @param {frontend_event_logsCreateManyAndReturnArgs} args - Arguments to create many Frontend_event_logs.
     * @example
     * // Create many Frontend_event_logs
     * const frontend_event_logs = await prisma.frontend_event_logs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Frontend_event_logs and only return the `id`
     * const frontend_event_logsWithIdOnly = await prisma.frontend_event_logs.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends frontend_event_logsCreateManyAndReturnArgs>(args?: SelectSubset<T, frontend_event_logsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$frontend_event_logsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Frontend_event_logs.
     * @param {frontend_event_logsDeleteArgs} args - Arguments to delete one Frontend_event_logs.
     * @example
     * // Delete one Frontend_event_logs
     * const Frontend_event_logs = await prisma.frontend_event_logs.delete({
     *   where: {
     *     // ... filter to delete one Frontend_event_logs
     *   }
     * })
     * 
     */
    delete<T extends frontend_event_logsDeleteArgs>(args: SelectSubset<T, frontend_event_logsDeleteArgs<ExtArgs>>): Prisma__frontend_event_logsClient<$Result.GetResult<Prisma.$frontend_event_logsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Frontend_event_logs.
     * @param {frontend_event_logsUpdateArgs} args - Arguments to update one Frontend_event_logs.
     * @example
     * // Update one Frontend_event_logs
     * const frontend_event_logs = await prisma.frontend_event_logs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends frontend_event_logsUpdateArgs>(args: SelectSubset<T, frontend_event_logsUpdateArgs<ExtArgs>>): Prisma__frontend_event_logsClient<$Result.GetResult<Prisma.$frontend_event_logsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Frontend_event_logs.
     * @param {frontend_event_logsDeleteManyArgs} args - Arguments to filter Frontend_event_logs to delete.
     * @example
     * // Delete a few Frontend_event_logs
     * const { count } = await prisma.frontend_event_logs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends frontend_event_logsDeleteManyArgs>(args?: SelectSubset<T, frontend_event_logsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Frontend_event_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {frontend_event_logsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Frontend_event_logs
     * const frontend_event_logs = await prisma.frontend_event_logs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends frontend_event_logsUpdateManyArgs>(args: SelectSubset<T, frontend_event_logsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Frontend_event_logs and returns the data updated in the database.
     * @param {frontend_event_logsUpdateManyAndReturnArgs} args - Arguments to update many Frontend_event_logs.
     * @example
     * // Update many Frontend_event_logs
     * const frontend_event_logs = await prisma.frontend_event_logs.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Frontend_event_logs and only return the `id`
     * const frontend_event_logsWithIdOnly = await prisma.frontend_event_logs.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends frontend_event_logsUpdateManyAndReturnArgs>(args: SelectSubset<T, frontend_event_logsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$frontend_event_logsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Frontend_event_logs.
     * @param {frontend_event_logsUpsertArgs} args - Arguments to update or create a Frontend_event_logs.
     * @example
     * // Update or create a Frontend_event_logs
     * const frontend_event_logs = await prisma.frontend_event_logs.upsert({
     *   create: {
     *     // ... data to create a Frontend_event_logs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Frontend_event_logs we want to update
     *   }
     * })
     */
    upsert<T extends frontend_event_logsUpsertArgs>(args: SelectSubset<T, frontend_event_logsUpsertArgs<ExtArgs>>): Prisma__frontend_event_logsClient<$Result.GetResult<Prisma.$frontend_event_logsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Frontend_event_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {frontend_event_logsCountArgs} args - Arguments to filter Frontend_event_logs to count.
     * @example
     * // Count the number of Frontend_event_logs
     * const count = await prisma.frontend_event_logs.count({
     *   where: {
     *     // ... the filter for the Frontend_event_logs we want to count
     *   }
     * })
    **/
    count<T extends frontend_event_logsCountArgs>(
      args?: Subset<T, frontend_event_logsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Frontend_event_logsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Frontend_event_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Frontend_event_logsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Frontend_event_logsAggregateArgs>(args: Subset<T, Frontend_event_logsAggregateArgs>): Prisma.PrismaPromise<GetFrontend_event_logsAggregateType<T>>

    /**
     * Group by Frontend_event_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {frontend_event_logsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends frontend_event_logsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: frontend_event_logsGroupByArgs['orderBy'] }
        : { orderBy?: frontend_event_logsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, frontend_event_logsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFrontend_event_logsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the frontend_event_logs model
   */
  readonly fields: frontend_event_logsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for frontend_event_logs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__frontend_event_logsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the frontend_event_logs model
   */
  interface frontend_event_logsFieldRefs {
    readonly id: FieldRef<"frontend_event_logs", 'String'>
    readonly user_id: FieldRef<"frontend_event_logs", 'String'>
    readonly event_name: FieldRef<"frontend_event_logs", 'String'>
    readonly error_level: FieldRef<"frontend_event_logs", 'frontend_event_logs_error_level'>
    readonly screen_name: FieldRef<"frontend_event_logs", 'String'>
    readonly payload: FieldRef<"frontend_event_logs", 'String'>
    readonly created_at: FieldRef<"frontend_event_logs", 'DateTime'>
    readonly created_app_version: FieldRef<"frontend_event_logs", 'String'>
    readonly created_commit_id: FieldRef<"frontend_event_logs", 'String'>
  }
    

  // Custom InputTypes
  /**
   * frontend_event_logs findUnique
   */
  export type frontend_event_logsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the frontend_event_logs
     */
    select?: frontend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the frontend_event_logs
     */
    omit?: frontend_event_logsOmit<ExtArgs> | null
    /**
     * Filter, which frontend_event_logs to fetch.
     */
    where: frontend_event_logsWhereUniqueInput
  }

  /**
   * frontend_event_logs findUniqueOrThrow
   */
  export type frontend_event_logsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the frontend_event_logs
     */
    select?: frontend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the frontend_event_logs
     */
    omit?: frontend_event_logsOmit<ExtArgs> | null
    /**
     * Filter, which frontend_event_logs to fetch.
     */
    where: frontend_event_logsWhereUniqueInput
  }

  /**
   * frontend_event_logs findFirst
   */
  export type frontend_event_logsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the frontend_event_logs
     */
    select?: frontend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the frontend_event_logs
     */
    omit?: frontend_event_logsOmit<ExtArgs> | null
    /**
     * Filter, which frontend_event_logs to fetch.
     */
    where?: frontend_event_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of frontend_event_logs to fetch.
     */
    orderBy?: frontend_event_logsOrderByWithRelationInput | frontend_event_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for frontend_event_logs.
     */
    cursor?: frontend_event_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` frontend_event_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` frontend_event_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of frontend_event_logs.
     */
    distinct?: Frontend_event_logsScalarFieldEnum | Frontend_event_logsScalarFieldEnum[]
  }

  /**
   * frontend_event_logs findFirstOrThrow
   */
  export type frontend_event_logsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the frontend_event_logs
     */
    select?: frontend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the frontend_event_logs
     */
    omit?: frontend_event_logsOmit<ExtArgs> | null
    /**
     * Filter, which frontend_event_logs to fetch.
     */
    where?: frontend_event_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of frontend_event_logs to fetch.
     */
    orderBy?: frontend_event_logsOrderByWithRelationInput | frontend_event_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for frontend_event_logs.
     */
    cursor?: frontend_event_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` frontend_event_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` frontend_event_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of frontend_event_logs.
     */
    distinct?: Frontend_event_logsScalarFieldEnum | Frontend_event_logsScalarFieldEnum[]
  }

  /**
   * frontend_event_logs findMany
   */
  export type frontend_event_logsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the frontend_event_logs
     */
    select?: frontend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the frontend_event_logs
     */
    omit?: frontend_event_logsOmit<ExtArgs> | null
    /**
     * Filter, which frontend_event_logs to fetch.
     */
    where?: frontend_event_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of frontend_event_logs to fetch.
     */
    orderBy?: frontend_event_logsOrderByWithRelationInput | frontend_event_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing frontend_event_logs.
     */
    cursor?: frontend_event_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` frontend_event_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` frontend_event_logs.
     */
    skip?: number
    distinct?: Frontend_event_logsScalarFieldEnum | Frontend_event_logsScalarFieldEnum[]
  }

  /**
   * frontend_event_logs create
   */
  export type frontend_event_logsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the frontend_event_logs
     */
    select?: frontend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the frontend_event_logs
     */
    omit?: frontend_event_logsOmit<ExtArgs> | null
    /**
     * The data needed to create a frontend_event_logs.
     */
    data: XOR<frontend_event_logsCreateInput, frontend_event_logsUncheckedCreateInput>
  }

  /**
   * frontend_event_logs createMany
   */
  export type frontend_event_logsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many frontend_event_logs.
     */
    data: frontend_event_logsCreateManyInput | frontend_event_logsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * frontend_event_logs createManyAndReturn
   */
  export type frontend_event_logsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the frontend_event_logs
     */
    select?: frontend_event_logsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the frontend_event_logs
     */
    omit?: frontend_event_logsOmit<ExtArgs> | null
    /**
     * The data used to create many frontend_event_logs.
     */
    data: frontend_event_logsCreateManyInput | frontend_event_logsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * frontend_event_logs update
   */
  export type frontend_event_logsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the frontend_event_logs
     */
    select?: frontend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the frontend_event_logs
     */
    omit?: frontend_event_logsOmit<ExtArgs> | null
    /**
     * The data needed to update a frontend_event_logs.
     */
    data: XOR<frontend_event_logsUpdateInput, frontend_event_logsUncheckedUpdateInput>
    /**
     * Choose, which frontend_event_logs to update.
     */
    where: frontend_event_logsWhereUniqueInput
  }

  /**
   * frontend_event_logs updateMany
   */
  export type frontend_event_logsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update frontend_event_logs.
     */
    data: XOR<frontend_event_logsUpdateManyMutationInput, frontend_event_logsUncheckedUpdateManyInput>
    /**
     * Filter which frontend_event_logs to update
     */
    where?: frontend_event_logsWhereInput
    /**
     * Limit how many frontend_event_logs to update.
     */
    limit?: number
  }

  /**
   * frontend_event_logs updateManyAndReturn
   */
  export type frontend_event_logsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the frontend_event_logs
     */
    select?: frontend_event_logsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the frontend_event_logs
     */
    omit?: frontend_event_logsOmit<ExtArgs> | null
    /**
     * The data used to update frontend_event_logs.
     */
    data: XOR<frontend_event_logsUpdateManyMutationInput, frontend_event_logsUncheckedUpdateManyInput>
    /**
     * Filter which frontend_event_logs to update
     */
    where?: frontend_event_logsWhereInput
    /**
     * Limit how many frontend_event_logs to update.
     */
    limit?: number
  }

  /**
   * frontend_event_logs upsert
   */
  export type frontend_event_logsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the frontend_event_logs
     */
    select?: frontend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the frontend_event_logs
     */
    omit?: frontend_event_logsOmit<ExtArgs> | null
    /**
     * The filter to search for the frontend_event_logs to update in case it exists.
     */
    where: frontend_event_logsWhereUniqueInput
    /**
     * In case the frontend_event_logs found by the `where` argument doesn't exist, create a new frontend_event_logs with this data.
     */
    create: XOR<frontend_event_logsCreateInput, frontend_event_logsUncheckedCreateInput>
    /**
     * In case the frontend_event_logs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<frontend_event_logsUpdateInput, frontend_event_logsUncheckedUpdateInput>
  }

  /**
   * frontend_event_logs delete
   */
  export type frontend_event_logsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the frontend_event_logs
     */
    select?: frontend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the frontend_event_logs
     */
    omit?: frontend_event_logsOmit<ExtArgs> | null
    /**
     * Filter which frontend_event_logs to delete.
     */
    where: frontend_event_logsWhereUniqueInput
  }

  /**
   * frontend_event_logs deleteMany
   */
  export type frontend_event_logsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which frontend_event_logs to delete
     */
    where?: frontend_event_logsWhereInput
    /**
     * Limit how many frontend_event_logs to delete.
     */
    limit?: number
  }

  /**
   * frontend_event_logs without action
   */
  export type frontend_event_logsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the frontend_event_logs
     */
    select?: frontend_event_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the frontend_event_logs
     */
    omit?: frontend_event_logsOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Backend_event_logsScalarFieldEnum: {
    id: 'id',
    event_name: 'event_name',
    error_level: 'error_level',
    function_name: 'function_name',
    user_id: 'user_id',
    payload: 'payload',
    request_id: 'request_id',
    created_at: 'created_at',
    created_commit_id: 'created_commit_id'
  };

  export type Backend_event_logsScalarFieldEnum = (typeof Backend_event_logsScalarFieldEnum)[keyof typeof Backend_event_logsScalarFieldEnum]


  export const External_api_logsScalarFieldEnum: {
    id: 'id',
    request_id: 'request_id',
    function_name: 'function_name',
    api_name: 'api_name',
    endpoint: 'endpoint',
    request_payload: 'request_payload',
    response_payload: 'response_payload',
    status_code: 'status_code',
    error_message: 'error_message',
    response_time_ms: 'response_time_ms',
    user_id: 'user_id',
    created_at: 'created_at',
    created_commit_id: 'created_commit_id'
  };

  export type External_api_logsScalarFieldEnum = (typeof External_api_logsScalarFieldEnum)[keyof typeof External_api_logsScalarFieldEnum]


  export const Frontend_event_logsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    event_name: 'event_name',
    error_level: 'error_level',
    screen_name: 'screen_name',
    payload: 'payload',
    created_at: 'created_at',
    created_app_version: 'created_app_version',
    created_commit_id: 'created_commit_id'
  };

  export type Frontend_event_logsScalarFieldEnum = (typeof Frontend_event_logsScalarFieldEnum)[keyof typeof Frontend_event_logsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'backend_event_logs_error_level'
   */
  export type Enumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'backend_event_logs_error_level'>
    


  /**
   * Reference to a field of type 'backend_event_logs_error_level[]'
   */
  export type ListEnumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'backend_event_logs_error_level[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'frontend_event_logs_error_level'
   */
  export type Enumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'frontend_event_logs_error_level'>
    


  /**
   * Reference to a field of type 'frontend_event_logs_error_level[]'
   */
  export type ListEnumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'frontend_event_logs_error_level[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type backend_event_logsWhereInput = {
    AND?: backend_event_logsWhereInput | backend_event_logsWhereInput[]
    OR?: backend_event_logsWhereInput[]
    NOT?: backend_event_logsWhereInput | backend_event_logsWhereInput[]
    id?: StringFilter<"backend_event_logs"> | string
    event_name?: StringNullableFilter<"backend_event_logs"> | string | null
    error_level?: Enumbackend_event_logs_error_levelNullableFilter<"backend_event_logs"> | $Enums.backend_event_logs_error_level | null
    function_name?: StringNullableFilter<"backend_event_logs"> | string | null
    user_id?: StringNullableFilter<"backend_event_logs"> | string | null
    payload?: JsonNullableFilter<"backend_event_logs">
    request_id?: StringNullableFilter<"backend_event_logs"> | string | null
    created_at?: DateTimeFilter<"backend_event_logs"> | Date | string
    created_commit_id?: StringFilter<"backend_event_logs"> | string
  }

  export type backend_event_logsOrderByWithRelationInput = {
    id?: SortOrder
    event_name?: SortOrderInput | SortOrder
    error_level?: SortOrderInput | SortOrder
    function_name?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    payload?: SortOrderInput | SortOrder
    request_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    created_commit_id?: SortOrder
  }

  export type backend_event_logsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: backend_event_logsWhereInput | backend_event_logsWhereInput[]
    OR?: backend_event_logsWhereInput[]
    NOT?: backend_event_logsWhereInput | backend_event_logsWhereInput[]
    event_name?: StringNullableFilter<"backend_event_logs"> | string | null
    error_level?: Enumbackend_event_logs_error_levelNullableFilter<"backend_event_logs"> | $Enums.backend_event_logs_error_level | null
    function_name?: StringNullableFilter<"backend_event_logs"> | string | null
    user_id?: StringNullableFilter<"backend_event_logs"> | string | null
    payload?: JsonNullableFilter<"backend_event_logs">
    request_id?: StringNullableFilter<"backend_event_logs"> | string | null
    created_at?: DateTimeFilter<"backend_event_logs"> | Date | string
    created_commit_id?: StringFilter<"backend_event_logs"> | string
  }, "id">

  export type backend_event_logsOrderByWithAggregationInput = {
    id?: SortOrder
    event_name?: SortOrderInput | SortOrder
    error_level?: SortOrderInput | SortOrder
    function_name?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    payload?: SortOrderInput | SortOrder
    request_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    created_commit_id?: SortOrder
    _count?: backend_event_logsCountOrderByAggregateInput
    _max?: backend_event_logsMaxOrderByAggregateInput
    _min?: backend_event_logsMinOrderByAggregateInput
  }

  export type backend_event_logsScalarWhereWithAggregatesInput = {
    AND?: backend_event_logsScalarWhereWithAggregatesInput | backend_event_logsScalarWhereWithAggregatesInput[]
    OR?: backend_event_logsScalarWhereWithAggregatesInput[]
    NOT?: backend_event_logsScalarWhereWithAggregatesInput | backend_event_logsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"backend_event_logs"> | string
    event_name?: StringNullableWithAggregatesFilter<"backend_event_logs"> | string | null
    error_level?: Enumbackend_event_logs_error_levelNullableWithAggregatesFilter<"backend_event_logs"> | $Enums.backend_event_logs_error_level | null
    function_name?: StringNullableWithAggregatesFilter<"backend_event_logs"> | string | null
    user_id?: StringNullableWithAggregatesFilter<"backend_event_logs"> | string | null
    payload?: JsonNullableWithAggregatesFilter<"backend_event_logs">
    request_id?: StringNullableWithAggregatesFilter<"backend_event_logs"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"backend_event_logs"> | Date | string
    created_commit_id?: StringWithAggregatesFilter<"backend_event_logs"> | string
  }

  export type external_api_logsWhereInput = {
    AND?: external_api_logsWhereInput | external_api_logsWhereInput[]
    OR?: external_api_logsWhereInput[]
    NOT?: external_api_logsWhereInput | external_api_logsWhereInput[]
    id?: StringFilter<"external_api_logs"> | string
    request_id?: StringNullableFilter<"external_api_logs"> | string | null
    function_name?: StringNullableFilter<"external_api_logs"> | string | null
    api_name?: StringNullableFilter<"external_api_logs"> | string | null
    endpoint?: StringNullableFilter<"external_api_logs"> | string | null
    request_payload?: JsonNullableFilter<"external_api_logs">
    response_payload?: JsonNullableFilter<"external_api_logs">
    status_code?: IntNullableFilter<"external_api_logs"> | number | null
    error_message?: StringNullableFilter<"external_api_logs"> | string | null
    response_time_ms?: IntNullableFilter<"external_api_logs"> | number | null
    user_id?: StringNullableFilter<"external_api_logs"> | string | null
    created_at?: DateTimeFilter<"external_api_logs"> | Date | string
    created_commit_id?: StringFilter<"external_api_logs"> | string
  }

  export type external_api_logsOrderByWithRelationInput = {
    id?: SortOrder
    request_id?: SortOrderInput | SortOrder
    function_name?: SortOrderInput | SortOrder
    api_name?: SortOrderInput | SortOrder
    endpoint?: SortOrderInput | SortOrder
    request_payload?: SortOrderInput | SortOrder
    response_payload?: SortOrderInput | SortOrder
    status_code?: SortOrderInput | SortOrder
    error_message?: SortOrderInput | SortOrder
    response_time_ms?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    created_commit_id?: SortOrder
  }

  export type external_api_logsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: external_api_logsWhereInput | external_api_logsWhereInput[]
    OR?: external_api_logsWhereInput[]
    NOT?: external_api_logsWhereInput | external_api_logsWhereInput[]
    request_id?: StringNullableFilter<"external_api_logs"> | string | null
    function_name?: StringNullableFilter<"external_api_logs"> | string | null
    api_name?: StringNullableFilter<"external_api_logs"> | string | null
    endpoint?: StringNullableFilter<"external_api_logs"> | string | null
    request_payload?: JsonNullableFilter<"external_api_logs">
    response_payload?: JsonNullableFilter<"external_api_logs">
    status_code?: IntNullableFilter<"external_api_logs"> | number | null
    error_message?: StringNullableFilter<"external_api_logs"> | string | null
    response_time_ms?: IntNullableFilter<"external_api_logs"> | number | null
    user_id?: StringNullableFilter<"external_api_logs"> | string | null
    created_at?: DateTimeFilter<"external_api_logs"> | Date | string
    created_commit_id?: StringFilter<"external_api_logs"> | string
  }, "id">

  export type external_api_logsOrderByWithAggregationInput = {
    id?: SortOrder
    request_id?: SortOrderInput | SortOrder
    function_name?: SortOrderInput | SortOrder
    api_name?: SortOrderInput | SortOrder
    endpoint?: SortOrderInput | SortOrder
    request_payload?: SortOrderInput | SortOrder
    response_payload?: SortOrderInput | SortOrder
    status_code?: SortOrderInput | SortOrder
    error_message?: SortOrderInput | SortOrder
    response_time_ms?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    created_commit_id?: SortOrder
    _count?: external_api_logsCountOrderByAggregateInput
    _avg?: external_api_logsAvgOrderByAggregateInput
    _max?: external_api_logsMaxOrderByAggregateInput
    _min?: external_api_logsMinOrderByAggregateInput
    _sum?: external_api_logsSumOrderByAggregateInput
  }

  export type external_api_logsScalarWhereWithAggregatesInput = {
    AND?: external_api_logsScalarWhereWithAggregatesInput | external_api_logsScalarWhereWithAggregatesInput[]
    OR?: external_api_logsScalarWhereWithAggregatesInput[]
    NOT?: external_api_logsScalarWhereWithAggregatesInput | external_api_logsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"external_api_logs"> | string
    request_id?: StringNullableWithAggregatesFilter<"external_api_logs"> | string | null
    function_name?: StringNullableWithAggregatesFilter<"external_api_logs"> | string | null
    api_name?: StringNullableWithAggregatesFilter<"external_api_logs"> | string | null
    endpoint?: StringNullableWithAggregatesFilter<"external_api_logs"> | string | null
    request_payload?: JsonNullableWithAggregatesFilter<"external_api_logs">
    response_payload?: JsonNullableWithAggregatesFilter<"external_api_logs">
    status_code?: IntNullableWithAggregatesFilter<"external_api_logs"> | number | null
    error_message?: StringNullableWithAggregatesFilter<"external_api_logs"> | string | null
    response_time_ms?: IntNullableWithAggregatesFilter<"external_api_logs"> | number | null
    user_id?: StringNullableWithAggregatesFilter<"external_api_logs"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"external_api_logs"> | Date | string
    created_commit_id?: StringWithAggregatesFilter<"external_api_logs"> | string
  }

  export type frontend_event_logsWhereInput = {
    AND?: frontend_event_logsWhereInput | frontend_event_logsWhereInput[]
    OR?: frontend_event_logsWhereInput[]
    NOT?: frontend_event_logsWhereInput | frontend_event_logsWhereInput[]
    id?: StringFilter<"frontend_event_logs"> | string
    user_id?: StringNullableFilter<"frontend_event_logs"> | string | null
    event_name?: StringNullableFilter<"frontend_event_logs"> | string | null
    error_level?: Enumfrontend_event_logs_error_levelNullableFilter<"frontend_event_logs"> | $Enums.frontend_event_logs_error_level | null
    screen_name?: StringNullableFilter<"frontend_event_logs"> | string | null
    payload?: StringNullableFilter<"frontend_event_logs"> | string | null
    created_at?: DateTimeFilter<"frontend_event_logs"> | Date | string
    created_app_version?: StringFilter<"frontend_event_logs"> | string
    created_commit_id?: StringFilter<"frontend_event_logs"> | string
  }

  export type frontend_event_logsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    event_name?: SortOrderInput | SortOrder
    error_level?: SortOrderInput | SortOrder
    screen_name?: SortOrderInput | SortOrder
    payload?: SortOrderInput | SortOrder
    created_at?: SortOrder
    created_app_version?: SortOrder
    created_commit_id?: SortOrder
  }

  export type frontend_event_logsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: frontend_event_logsWhereInput | frontend_event_logsWhereInput[]
    OR?: frontend_event_logsWhereInput[]
    NOT?: frontend_event_logsWhereInput | frontend_event_logsWhereInput[]
    user_id?: StringNullableFilter<"frontend_event_logs"> | string | null
    event_name?: StringNullableFilter<"frontend_event_logs"> | string | null
    error_level?: Enumfrontend_event_logs_error_levelNullableFilter<"frontend_event_logs"> | $Enums.frontend_event_logs_error_level | null
    screen_name?: StringNullableFilter<"frontend_event_logs"> | string | null
    payload?: StringNullableFilter<"frontend_event_logs"> | string | null
    created_at?: DateTimeFilter<"frontend_event_logs"> | Date | string
    created_app_version?: StringFilter<"frontend_event_logs"> | string
    created_commit_id?: StringFilter<"frontend_event_logs"> | string
  }, "id">

  export type frontend_event_logsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    event_name?: SortOrderInput | SortOrder
    error_level?: SortOrderInput | SortOrder
    screen_name?: SortOrderInput | SortOrder
    payload?: SortOrderInput | SortOrder
    created_at?: SortOrder
    created_app_version?: SortOrder
    created_commit_id?: SortOrder
    _count?: frontend_event_logsCountOrderByAggregateInput
    _max?: frontend_event_logsMaxOrderByAggregateInput
    _min?: frontend_event_logsMinOrderByAggregateInput
  }

  export type frontend_event_logsScalarWhereWithAggregatesInput = {
    AND?: frontend_event_logsScalarWhereWithAggregatesInput | frontend_event_logsScalarWhereWithAggregatesInput[]
    OR?: frontend_event_logsScalarWhereWithAggregatesInput[]
    NOT?: frontend_event_logsScalarWhereWithAggregatesInput | frontend_event_logsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"frontend_event_logs"> | string
    user_id?: StringNullableWithAggregatesFilter<"frontend_event_logs"> | string | null
    event_name?: StringNullableWithAggregatesFilter<"frontend_event_logs"> | string | null
    error_level?: Enumfrontend_event_logs_error_levelNullableWithAggregatesFilter<"frontend_event_logs"> | $Enums.frontend_event_logs_error_level | null
    screen_name?: StringNullableWithAggregatesFilter<"frontend_event_logs"> | string | null
    payload?: StringNullableWithAggregatesFilter<"frontend_event_logs"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"frontend_event_logs"> | Date | string
    created_app_version?: StringWithAggregatesFilter<"frontend_event_logs"> | string
    created_commit_id?: StringWithAggregatesFilter<"frontend_event_logs"> | string
  }

  export type backend_event_logsCreateInput = {
    id: string
    event_name?: string | null
    error_level?: $Enums.backend_event_logs_error_level | null
    function_name?: string | null
    user_id?: string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    request_id?: string | null
    created_at?: Date | string
    created_commit_id: string
  }

  export type backend_event_logsUncheckedCreateInput = {
    id: string
    event_name?: string | null
    error_level?: $Enums.backend_event_logs_error_level | null
    function_name?: string | null
    user_id?: string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    request_id?: string | null
    created_at?: Date | string
    created_commit_id: string
  }

  export type backend_event_logsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_name?: NullableStringFieldUpdateOperationsInput | string | null
    error_level?: NullableEnumbackend_event_logs_error_levelFieldUpdateOperationsInput | $Enums.backend_event_logs_error_level | null
    function_name?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    request_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_commit_id?: StringFieldUpdateOperationsInput | string
  }

  export type backend_event_logsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_name?: NullableStringFieldUpdateOperationsInput | string | null
    error_level?: NullableEnumbackend_event_logs_error_levelFieldUpdateOperationsInput | $Enums.backend_event_logs_error_level | null
    function_name?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    request_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_commit_id?: StringFieldUpdateOperationsInput | string
  }

  export type backend_event_logsCreateManyInput = {
    id: string
    event_name?: string | null
    error_level?: $Enums.backend_event_logs_error_level | null
    function_name?: string | null
    user_id?: string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    request_id?: string | null
    created_at?: Date | string
    created_commit_id: string
  }

  export type backend_event_logsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_name?: NullableStringFieldUpdateOperationsInput | string | null
    error_level?: NullableEnumbackend_event_logs_error_levelFieldUpdateOperationsInput | $Enums.backend_event_logs_error_level | null
    function_name?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    request_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_commit_id?: StringFieldUpdateOperationsInput | string
  }

  export type backend_event_logsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_name?: NullableStringFieldUpdateOperationsInput | string | null
    error_level?: NullableEnumbackend_event_logs_error_levelFieldUpdateOperationsInput | $Enums.backend_event_logs_error_level | null
    function_name?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    request_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_commit_id?: StringFieldUpdateOperationsInput | string
  }

  export type external_api_logsCreateInput = {
    id: string
    request_id?: string | null
    function_name?: string | null
    api_name?: string | null
    endpoint?: string | null
    request_payload?: NullableJsonNullValueInput | InputJsonValue
    response_payload?: NullableJsonNullValueInput | InputJsonValue
    status_code?: number | null
    error_message?: string | null
    response_time_ms?: number | null
    user_id?: string | null
    created_at?: Date | string
    created_commit_id: string
  }

  export type external_api_logsUncheckedCreateInput = {
    id: string
    request_id?: string | null
    function_name?: string | null
    api_name?: string | null
    endpoint?: string | null
    request_payload?: NullableJsonNullValueInput | InputJsonValue
    response_payload?: NullableJsonNullValueInput | InputJsonValue
    status_code?: number | null
    error_message?: string | null
    response_time_ms?: number | null
    user_id?: string | null
    created_at?: Date | string
    created_commit_id: string
  }

  export type external_api_logsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    request_id?: NullableStringFieldUpdateOperationsInput | string | null
    function_name?: NullableStringFieldUpdateOperationsInput | string | null
    api_name?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: NullableStringFieldUpdateOperationsInput | string | null
    request_payload?: NullableJsonNullValueInput | InputJsonValue
    response_payload?: NullableJsonNullValueInput | InputJsonValue
    status_code?: NullableIntFieldUpdateOperationsInput | number | null
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    response_time_ms?: NullableIntFieldUpdateOperationsInput | number | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_commit_id?: StringFieldUpdateOperationsInput | string
  }

  export type external_api_logsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    request_id?: NullableStringFieldUpdateOperationsInput | string | null
    function_name?: NullableStringFieldUpdateOperationsInput | string | null
    api_name?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: NullableStringFieldUpdateOperationsInput | string | null
    request_payload?: NullableJsonNullValueInput | InputJsonValue
    response_payload?: NullableJsonNullValueInput | InputJsonValue
    status_code?: NullableIntFieldUpdateOperationsInput | number | null
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    response_time_ms?: NullableIntFieldUpdateOperationsInput | number | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_commit_id?: StringFieldUpdateOperationsInput | string
  }

  export type external_api_logsCreateManyInput = {
    id: string
    request_id?: string | null
    function_name?: string | null
    api_name?: string | null
    endpoint?: string | null
    request_payload?: NullableJsonNullValueInput | InputJsonValue
    response_payload?: NullableJsonNullValueInput | InputJsonValue
    status_code?: number | null
    error_message?: string | null
    response_time_ms?: number | null
    user_id?: string | null
    created_at?: Date | string
    created_commit_id: string
  }

  export type external_api_logsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    request_id?: NullableStringFieldUpdateOperationsInput | string | null
    function_name?: NullableStringFieldUpdateOperationsInput | string | null
    api_name?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: NullableStringFieldUpdateOperationsInput | string | null
    request_payload?: NullableJsonNullValueInput | InputJsonValue
    response_payload?: NullableJsonNullValueInput | InputJsonValue
    status_code?: NullableIntFieldUpdateOperationsInput | number | null
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    response_time_ms?: NullableIntFieldUpdateOperationsInput | number | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_commit_id?: StringFieldUpdateOperationsInput | string
  }

  export type external_api_logsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    request_id?: NullableStringFieldUpdateOperationsInput | string | null
    function_name?: NullableStringFieldUpdateOperationsInput | string | null
    api_name?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: NullableStringFieldUpdateOperationsInput | string | null
    request_payload?: NullableJsonNullValueInput | InputJsonValue
    response_payload?: NullableJsonNullValueInput | InputJsonValue
    status_code?: NullableIntFieldUpdateOperationsInput | number | null
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    response_time_ms?: NullableIntFieldUpdateOperationsInput | number | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_commit_id?: StringFieldUpdateOperationsInput | string
  }

  export type frontend_event_logsCreateInput = {
    id: string
    user_id?: string | null
    event_name?: string | null
    error_level?: $Enums.frontend_event_logs_error_level | null
    screen_name?: string | null
    payload?: string | null
    created_at?: Date | string
    created_app_version: string
    created_commit_id: string
  }

  export type frontend_event_logsUncheckedCreateInput = {
    id: string
    user_id?: string | null
    event_name?: string | null
    error_level?: $Enums.frontend_event_logs_error_level | null
    screen_name?: string | null
    payload?: string | null
    created_at?: Date | string
    created_app_version: string
    created_commit_id: string
  }

  export type frontend_event_logsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    event_name?: NullableStringFieldUpdateOperationsInput | string | null
    error_level?: NullableEnumfrontend_event_logs_error_levelFieldUpdateOperationsInput | $Enums.frontend_event_logs_error_level | null
    screen_name?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_app_version?: StringFieldUpdateOperationsInput | string
    created_commit_id?: StringFieldUpdateOperationsInput | string
  }

  export type frontend_event_logsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    event_name?: NullableStringFieldUpdateOperationsInput | string | null
    error_level?: NullableEnumfrontend_event_logs_error_levelFieldUpdateOperationsInput | $Enums.frontend_event_logs_error_level | null
    screen_name?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_app_version?: StringFieldUpdateOperationsInput | string
    created_commit_id?: StringFieldUpdateOperationsInput | string
  }

  export type frontend_event_logsCreateManyInput = {
    id: string
    user_id?: string | null
    event_name?: string | null
    error_level?: $Enums.frontend_event_logs_error_level | null
    screen_name?: string | null
    payload?: string | null
    created_at?: Date | string
    created_app_version: string
    created_commit_id: string
  }

  export type frontend_event_logsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    event_name?: NullableStringFieldUpdateOperationsInput | string | null
    error_level?: NullableEnumfrontend_event_logs_error_levelFieldUpdateOperationsInput | $Enums.frontend_event_logs_error_level | null
    screen_name?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_app_version?: StringFieldUpdateOperationsInput | string
    created_commit_id?: StringFieldUpdateOperationsInput | string
  }

  export type frontend_event_logsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    event_name?: NullableStringFieldUpdateOperationsInput | string | null
    error_level?: NullableEnumfrontend_event_logs_error_levelFieldUpdateOperationsInput | $Enums.frontend_event_logs_error_level | null
    screen_name?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_app_version?: StringFieldUpdateOperationsInput | string
    created_commit_id?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type Enumbackend_event_logs_error_levelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.backend_event_logs_error_level | Enumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    in?: $Enums.backend_event_logs_error_level[] | ListEnumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.backend_event_logs_error_level[] | ListEnumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumbackend_event_logs_error_levelNullableFilter<$PrismaModel> | $Enums.backend_event_logs_error_level | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type backend_event_logsCountOrderByAggregateInput = {
    id?: SortOrder
    event_name?: SortOrder
    error_level?: SortOrder
    function_name?: SortOrder
    user_id?: SortOrder
    payload?: SortOrder
    request_id?: SortOrder
    created_at?: SortOrder
    created_commit_id?: SortOrder
  }

  export type backend_event_logsMaxOrderByAggregateInput = {
    id?: SortOrder
    event_name?: SortOrder
    error_level?: SortOrder
    function_name?: SortOrder
    user_id?: SortOrder
    request_id?: SortOrder
    created_at?: SortOrder
    created_commit_id?: SortOrder
  }

  export type backend_event_logsMinOrderByAggregateInput = {
    id?: SortOrder
    event_name?: SortOrder
    error_level?: SortOrder
    function_name?: SortOrder
    user_id?: SortOrder
    request_id?: SortOrder
    created_at?: SortOrder
    created_commit_id?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type Enumbackend_event_logs_error_levelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.backend_event_logs_error_level | Enumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    in?: $Enums.backend_event_logs_error_level[] | ListEnumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.backend_event_logs_error_level[] | ListEnumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumbackend_event_logs_error_levelNullableWithAggregatesFilter<$PrismaModel> | $Enums.backend_event_logs_error_level | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumbackend_event_logs_error_levelNullableFilter<$PrismaModel>
    _max?: NestedEnumbackend_event_logs_error_levelNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type external_api_logsCountOrderByAggregateInput = {
    id?: SortOrder
    request_id?: SortOrder
    function_name?: SortOrder
    api_name?: SortOrder
    endpoint?: SortOrder
    request_payload?: SortOrder
    response_payload?: SortOrder
    status_code?: SortOrder
    error_message?: SortOrder
    response_time_ms?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    created_commit_id?: SortOrder
  }

  export type external_api_logsAvgOrderByAggregateInput = {
    status_code?: SortOrder
    response_time_ms?: SortOrder
  }

  export type external_api_logsMaxOrderByAggregateInput = {
    id?: SortOrder
    request_id?: SortOrder
    function_name?: SortOrder
    api_name?: SortOrder
    endpoint?: SortOrder
    status_code?: SortOrder
    error_message?: SortOrder
    response_time_ms?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    created_commit_id?: SortOrder
  }

  export type external_api_logsMinOrderByAggregateInput = {
    id?: SortOrder
    request_id?: SortOrder
    function_name?: SortOrder
    api_name?: SortOrder
    endpoint?: SortOrder
    status_code?: SortOrder
    error_message?: SortOrder
    response_time_ms?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    created_commit_id?: SortOrder
  }

  export type external_api_logsSumOrderByAggregateInput = {
    status_code?: SortOrder
    response_time_ms?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type Enumfrontend_event_logs_error_levelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.frontend_event_logs_error_level | Enumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    in?: $Enums.frontend_event_logs_error_level[] | ListEnumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.frontend_event_logs_error_level[] | ListEnumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumfrontend_event_logs_error_levelNullableFilter<$PrismaModel> | $Enums.frontend_event_logs_error_level | null
  }

  export type frontend_event_logsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_name?: SortOrder
    error_level?: SortOrder
    screen_name?: SortOrder
    payload?: SortOrder
    created_at?: SortOrder
    created_app_version?: SortOrder
    created_commit_id?: SortOrder
  }

  export type frontend_event_logsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_name?: SortOrder
    error_level?: SortOrder
    screen_name?: SortOrder
    payload?: SortOrder
    created_at?: SortOrder
    created_app_version?: SortOrder
    created_commit_id?: SortOrder
  }

  export type frontend_event_logsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_name?: SortOrder
    error_level?: SortOrder
    screen_name?: SortOrder
    payload?: SortOrder
    created_at?: SortOrder
    created_app_version?: SortOrder
    created_commit_id?: SortOrder
  }

  export type Enumfrontend_event_logs_error_levelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.frontend_event_logs_error_level | Enumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    in?: $Enums.frontend_event_logs_error_level[] | ListEnumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.frontend_event_logs_error_level[] | ListEnumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumfrontend_event_logs_error_levelNullableWithAggregatesFilter<$PrismaModel> | $Enums.frontend_event_logs_error_level | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumfrontend_event_logs_error_levelNullableFilter<$PrismaModel>
    _max?: NestedEnumfrontend_event_logs_error_levelNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableEnumbackend_event_logs_error_levelFieldUpdateOperationsInput = {
    set?: $Enums.backend_event_logs_error_level | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumfrontend_event_logs_error_levelFieldUpdateOperationsInput = {
    set?: $Enums.frontend_event_logs_error_level | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumbackend_event_logs_error_levelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.backend_event_logs_error_level | Enumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    in?: $Enums.backend_event_logs_error_level[] | ListEnumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.backend_event_logs_error_level[] | ListEnumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumbackend_event_logs_error_levelNullableFilter<$PrismaModel> | $Enums.backend_event_logs_error_level | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumbackend_event_logs_error_levelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.backend_event_logs_error_level | Enumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    in?: $Enums.backend_event_logs_error_level[] | ListEnumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.backend_event_logs_error_level[] | ListEnumbackend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumbackend_event_logs_error_levelNullableWithAggregatesFilter<$PrismaModel> | $Enums.backend_event_logs_error_level | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumbackend_event_logs_error_levelNullableFilter<$PrismaModel>
    _max?: NestedEnumbackend_event_logs_error_levelNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumfrontend_event_logs_error_levelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.frontend_event_logs_error_level | Enumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    in?: $Enums.frontend_event_logs_error_level[] | ListEnumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.frontend_event_logs_error_level[] | ListEnumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumfrontend_event_logs_error_levelNullableFilter<$PrismaModel> | $Enums.frontend_event_logs_error_level | null
  }

  export type NestedEnumfrontend_event_logs_error_levelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.frontend_event_logs_error_level | Enumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    in?: $Enums.frontend_event_logs_error_level[] | ListEnumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.frontend_event_logs_error_level[] | ListEnumfrontend_event_logs_error_levelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumfrontend_event_logs_error_levelNullableWithAggregatesFilter<$PrismaModel> | $Enums.frontend_event_logs_error_level | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumfrontend_event_logs_error_levelNullableFilter<$PrismaModel>
    _max?: NestedEnumfrontend_event_logs_error_levelNullableFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}