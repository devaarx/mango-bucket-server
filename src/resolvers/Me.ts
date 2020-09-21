import { Query, Resolver } from 'type-graphql';

@Resolver()
export class Me {
  @Query(() => String)
  me() {
    return 'hello world!';
  }
}
