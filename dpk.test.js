const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
});

describe("deterministicPartitionKey", () => {
    it ("Returns something when given an input", () =>{
        let key = deterministicPartitionKey("fizz"); 
        expect(key.length).toBeGreaterThan(0);
    });
});

describe("deterministicPartitionKey", () => {
    it ("Returns the same hash when given the same input", () =>{
        let key1 = deterministicPartitionKey("hello"); 
        let key2 = deterministicPartitionKey("hello");
        expect(key1).toEqual(key2);
    });
});

describe("deterministicPartitionKey", () => {
    it ("Returns different hashes when given different input", () =>{
        let key1 = deterministicPartitionKey("foo"); 
        let key2 = deterministicPartitionKey("bar");
        expect(key1).not.toEqual(key2);
    });
});

describe("deterministicPartitionKey", () => {
    it ("hashes non-string inputs", () =>{
        let key1 = deterministicPartitionKey(1); 
        expect(key1.length).toBeGreaterThan(0);
    });
});