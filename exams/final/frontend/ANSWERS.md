# Answers for Part 2

## Answer to question 1

- Inspecting the code for this component, there are hints that this component handles all of the following:
  - data fetching (note the use of `useEffect()` and `axios()`),
  - state management (e.g. registration tracking),
  - conditional rendering, and,
  - table layout
...all in one place. This reduces readability and maintainability, making testing individual functionality harder.

- When a student registers or de-registers, the component re-renders the entire table instead of updating just the row in question. For a small dataset, this may not be noticeable. However, for the volume of courses your client expects, this will impact performance.

- The label and action for the register/de-register button are determined inline, leading to repetition and logic being buried in JSX. This could be abstracted into a helper function or dedicated component for clarity.

- The component calls the API directly instead of relying on a separate and dedicated module.

## Answer to question 2

Component-level: Break the component into smaller subcomponents:
  - CourseRow: a component that renders each row of the table, including the registration/deregistration button.
  - CourseTable: the parent component that manages the list of courses, fetches the data, and passes it down to CourseRow as props.

State management: Replace `useState()` with `useReducer()` to manage the registration state in a centralized and predictable way. This will make for a clearer separation of concerns between actions (register/deregister) and state logic as well as easier maintenance and testability — especially as the system grows and more rules are added.

API-related: Extract all HTTP request logic into a dedicated module, e.g. httpReq.js). This way, the component will just call a function from that module, keeping the UI code focused and clean.