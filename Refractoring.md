# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
The function `deterministicPartitionKey` function hashes a given string. 
It takes a any input and returns a hashed version of the string. 
1. Unittests that I want to have is when the function has no input (given) and when something is passed through the function (added). 
2. I want to refactor the function to be cleaner, this can include comments, better variable names. 

I first created a unittests that covers the following: 
    1. no inputs (given)
    2. returns a hashed string with 1 given input
    3. returns the same hashed string for the same input
    4. returns a hashed string for non-string inputs

Second I refactored the function to have a guard function that will exit the function when no inputs are passed. 
Following, if an input is passed then I wanted to get the data, turn it into a json object. If the data exist then I will return the 
hash that is exisiting for that input. If not then I want to create a new hash. I achieved this using a ternary condition. Finally, 
if the created hash is longer than 256 characters, I wanted to rehash and return the new hash. 
