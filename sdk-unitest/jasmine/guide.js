/*
断言 https://github.com/pivotal/jasmine/wiki/Matchers		
expect(x).toEqual(y); 						compares objects or primitives x and y and passes if they are equivalent
expect(x).toBe(y); 							compares objects or primitives x and y and passes if they are the same object
expect(x).toMatch(pattern); 				compares x to string or regular expression pattern and passes if they match
expect(x).toBeDefined(); 					passes if x is not undefined
expect(x).toBeUndefined(); 					passes if x is undefined
expect(x).toBeNull(); 						passes if x is null
expect(x).toBeTruthy(); 					passes if x evaluates to true
expect(x).toBeFalsy(); 						passes if x evaluates to false
expect(x).toContain(y); 					passes if array or string x contains y
expect(x).toBeLessThan(y); 					passes if x is less than y
expect(x).toBeGreaterThan(y); 				passes if x is greater than y
expect(function(){fn();}).toThrow(e); 		passes if function fn throws exception e when executed

expect(x).not.toEqual(y); 					compares objects or primitives x and y and passes if they are not equivalent
*/

describe("$", function() { 
	var scripts;
	var lis;
	var node;

	beforeEach(function() {
		scripts = getObj("script");
		lis = getObj(".a");
		node = getObj("#jasmine");
	});

	describe("get nodes by id", function() {
	    it("node type should be text/javascript", function() {
	        expect(node.type).toEqual("text/javascript");
	    });
	});
});	