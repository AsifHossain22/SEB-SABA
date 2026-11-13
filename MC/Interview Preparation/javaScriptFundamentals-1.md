# JavaScript Fundamentals - I

### Q1: What is JavaScript?

    ### A1: JavaScript is a high-level programming language used to build dynamic and interactive web applications. It runs in the browser and on the server using Node.js.

### Q2: What is the difference between var, let and const in JavaScript?

    ### A2: The main difference between var, let and const is their scope, redeclaration and reassignment behabior. var is function-scoped, while let and const block-scoped. let allows reassignment but const doesn't allow reassignment.

    ### Example:

      #### A. var
      var is the older way of declaring variables.

      var is the older way of declaring variables.

      var name = "Hi ASIF";

      var name = "Hello RATUL"; // Allowed

      name = "Asif Hossain"; // Allowed

      console.log(name); // Asif Hossain

      - Function-scoped.
      - Can be redeclared.
      - Can be reassigned.
      - Can be accessed before declaration due to hoisting with value undefined.

      #### B. let
      let is used when a variable's value may change.

      let age = 25;

      age = 26; // Allowed

      // let age = 30; // Error in same scope

      console.log(age); // 26

      - Block-scoped.
      - Can't be redeclared in the same scope.
      - Can be reassigned.
      - Hoisted but inaccessible before declaration because of the Temporal Dead Zone (TDZ).

      #### C. const
      const is used when you don't want to reassign a variable.

      const country = "Bangladesh";

      // country = "UAE"; // Error

      console.log(country); // Bangladesh

      - Block-scoped.
      - Can't be redeclared in the same scope.
      - Can't be reassigned.
      - Must be initialized when declared.

      const user = {
        name: "Hi ASIF",
      }

      user.name = "Asif Hossain"; // Allowed

      console.log(user.name); // Asif Hossain

    #### Understand scope with an example

      {
        var a = 10;
        let b = 20;
        const c = 30;
      }

      console.log(a); // 10

      // console.log(b); // ReferenceError
      // console.log(c); // ReferenceError

    #### Professional practice:
    In modern JavaScript, prefer const by default. Use let when reassignment is necessary. Avoid var in new code unless have a specific reason.

    #### Q: Can we change an object declared with const?
      A: Yes. We can modify its properties but we can't reassign the variable to a completely different object.

    #### Q: Is let hoisted?
      A: Yes, let is hoisted. But it remains in the Temporal Dead Zone until its declaration is evaluated.

    #### Q: Which one should we use in modern JavaScript?
      A: We should prefer const by default and use let when reassignment is required. Generally, we avoid var.
