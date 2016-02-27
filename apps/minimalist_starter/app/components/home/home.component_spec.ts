import {
TestComponentBuilder,
describe,
expect,
inject,
it,
AsyncTestCompleter
} from 'angular2/testing_internal';
import {Component, View} from 'angular2/core';

import {HomeComponent} from './home.component';

export function main() {

  describe('HomeComponent', () => {

    it('should work',
      inject([TestComponentBuilder, AsyncTestCompleter], (tcb: TestComponentBuilder, async: AsyncTestCompleter) => {
        tcb.createAsync(HomeComponent).then((fixture) => {
          const compiled = fixture.debugElement.nativeElement;
          expect(compiled.querySelector('h2').textContent).toEqual('Home!');
          async.done();
        });
      }));

  });
}
