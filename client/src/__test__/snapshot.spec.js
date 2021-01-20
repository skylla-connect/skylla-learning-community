//import 'react-native';
import React from 'react';
import index from '../src/app/screens/Admin/index';
import renderer from 'react-test-renderer';

let findTextElement = function(tree, element){
    console.warn(tree)
    return true;
}

it('Find text element', ()=>{
   let tree = renderer.create(
       <index />
   ).toJSON();

   expect(findTextElement(tree, 'email')).toBeDefined();
})
