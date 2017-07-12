import { expect } from 'chai';
import { mount, render, shallow } from 'enzyme';

const { JSDOM } = require('jsdom');
const sinon = require('sinon');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}
const getCurrentPosition = (callback) => {
    callback({coords:{latitude:"1.1", longitude:"2.2"}})
}
global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
  geolocation: {
      getCurrentPosition:getCurrentPosition
  }
}
copyProps(window, global);


global.expect = expect;
global.mount = mount;
global.render = render;
global.shallow = shallow;
global.sinon = sinon;

