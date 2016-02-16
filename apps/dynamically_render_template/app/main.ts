import { Component, View, DynamicComponentLoader, ElementRef} from 'angular2/core';
import {bootstrap}    from 'angular2/platform/browser'



@Component({
	selector: 'some-component',
	properties: ['greeting'],
	template: `
    <b>{{ greeting }}</b>
  `
})
class SomeComponent { }




@Component({
	selector: 'app'
})
@View({
	template: `
    <h1>Before container</h1>
    <div #container></div>
    <h2>After container</h2>
  `
})
class App {
	loader: DynamicComponentLoader;
	elementRef: ElementRef;

	constructor(loader: DynamicComponentLoader, elementRef: ElementRef) {
		this.laoder = loader;
		this.elementRef = elementRef;
    
		// Some async action (maybe ajax response with html in it)
		setTimeout(() => this.renderTemplate(`
      <div>
        <h2>Hello</h2>
        <some-component greeting="Oh, hey"></some-component>
      </div>
    `, [SomeComponent]), 1000);
	}

	renderTemplate(template, directives) {
		this.laoder.loadIntoLocation(
			toComponent(template, directives),
			this.elementRef,
			'container'
		)
	}

}



function toComponent(template, directives = []) {
	@Component({ selector: 'fake-component' })
	@View({ template, directives })
	class FakeComponent { }

	return FakeComponent;
}


bootstrap(App);