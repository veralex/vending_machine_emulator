## Vending machine emulator

This is a test task from one enterprise. The task is to implementat a vending machine 

### Basic requirements:

1. Create data model which allows to implement MVP
2. Create a simple UI prototype which allows a user to use basic functions of the machine (pick item, add funds, refund, purchase)
3. Implement at least one full UI flow
4. Code must be covered with tests
5. The app must be based on React+TS. Any other libraries and frameworks are allowed.
6. The machine must be API-driven and must respond to basic commands like `pay`, `selectProduct`, etc.
7. The backend must not be implemented, all the interactions must be mocked
8. The session is not supposed to be persistent
9. There's no need to implement the entire flow BUT it must have an easy way to add other functions

### As a result of my job
What was implemented:
1. A mocked "backend" was created. Since it's emulated, it's always online and never throws exceptions (there's an option to handle error messages and statuses tho)
2. 4 basic components were implemented:
 - showcase component
 - cash feeder component
 - item picker component
 - error handler
3. Business logic tests

What was not implemented or could be done in a different way
1. I wouldn't pick `Styled Componets` for production because CSS-in-JS has some performance issues but since it's a test task it was the quickes way to start.
2. State management was not really implemented but `React Query` is enough for this task (because I consider a vending machine as a thin client), there's no need to drag `Redux` with all its dependencies to the project.
3. There's no optimization and memoization since the UI is simple, there are no costly equations and no long lists.
4. No UI tests were implemented - it's so simple that I don't even know what could be tested here.
5. I didn't split business logic level, presentation level and framework logic level here because the components and no longer than 45 lines of code.
