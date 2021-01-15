# Typesafe Global State with TypeScript, React & React Context

## Original article [on Medium](https://jamiehaywood.medium.com/typesafe-global-state-with-typescript-react-react-context-c2df743f3ce)

<br>

![](https://cdn-images-1.medium.com/max/1600/1*9McBI5ee2rTtUBRVoLQpCA.png)

For the purposes of this overview, all the code relating to our global state sits in a single file called `GlobalStateProvider.tsx`. You probably could abstract the code into multiple files / folders that better fit your structure.

When creating a typed global state with React Context the first step is creating the interface to that state. Inside our `GlobalStateProvider.tsx`:

```ts
export interface GlobalStateInterface {
  firstname: string;
  lastname: string;
  age: string;
}
```

and then create the context:

```ts
const GlobalStateContext = createContext({
  state: {} as Partial<GlobalStateInterface>,
  setState: {} as Dispatch<SetStateAction<Partial<GlobalStateInterface>>>,
});
```

This creates a default context object with a property of state that takes the shape of a Partial of our GlobalStateInterface that we declared above. It also takes a property of setState which is an object (a.k.a. a function) that is of type `Dispatch<SetStateAction<Partial<GlobalStateInterface>>>`

Next we need to setup and consume the context provider. This is the component that we use as a parent component around any child components that need to access the global state.

```ts
const GlobalStateProvider = ({
  children,
  value = {} as GlobalStateInterface,
}: {
  children: React.ReactNode;
  value?: Partial<GlobalStateInterface>;
}) => {
  const [state, setState] = useState(value);
  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
```

In this snippet we are effectively creating a wrapper that can be used at the top level of our app.

Of particular note in this snippet is that we are providing the value parameter a default value of an empty object that takes the shape of our GlobalStateInterface. This allows us to pass a default initial state at the top level where we consume our GlobalStateProvider. **This is very useful for using the wrapper when testing!**

Ok so we've done all the boilerplate-y setup, we're now onto consuming & setting our state 🎉.

In this snippet we are creating a hook that unpacks the GlobalStateContext using React's useContext hook and returns an object containing our state and the setState function (as we did above)
Ok so you've made it this far…congrats! Here's what your GlobalStateProvider.tsx file should look like:

```tsx
import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

export interface GlobalStateInterface {
  firstname: string;
  lastname: string;
  age: string;
}

const GlobalStateContext = createContext({
  state: {} as Partial<GlobalStateInterface>,
  setState: {} as Dispatch<SetStateAction<Partial<GlobalStateInterface>>>,
});

const GlobalStateProvider = ({
  children,
  value = {} as GlobalStateInterface,
}: {
  children: React.ReactNode;
  value?: Partial<GlobalStateInterface>;
}) => {
  const [state, setState] = useState(value);
  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateContext");
  }
  return context;
};

export { GlobalStateProvider, useGlobalState };
```

Now, in your app you need to wrap all the pages / components that need to use your state, I did this in the App.tsx beneath the React Router <Switch> component:

```tsx
import React from "react";
import { Route, Switch } from "react-router-dom";
import { GlobalStateProvider } from "./GlobalStateProvider";

import PageOne from "./PageOne";
import PageTwo from "./PageTwo";

function App() {
  return (
    <Switch>
      <GlobalStateProvider>
        <Route exact path="/">
          <PageOne />
        </Route>

        <Route exact path="/two">
          <PageTwo />
        </Route>
      </GlobalStateProvider>
    </Switch>
  );
}

export default App;
```

And now in your child page page you set your state (see line 10 & 13)

```tsx
import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useGlobalState, GlobalStateInterface } from "./GlobalStateProvider";

const PageOne = () => {
  const history = useHistory();
  const { handleSubmit, register } = useForm();
  const { setState } = useGlobalState();

  const submitFunction = (data: Partial<GlobalStateInterface>) => {
    setState((prev) => ({ ...prev, ...data }));
    history.push("/two");
  };

  return (
    <div>
      <h1>PAGE ONE</h1>

      <form onSubmit={handleSubmit(submitFunction)}>
        <div>
          <label htmlFor="firstname">First name:</label>
          <input ref={register} type="text" id="firstname" name="firstname" />
        </div>

        <div>
          <label htmlFor="lastname">Last name:</label>
          <input ref={register} type="text" id="lastname" name="lastname" />
        </div>

        <div>
          <label htmlFor="age">Age:</label>
          <input ref={register} type="number" id="age" name="age" />
        </div>

        <button type="submit">Next Page</button>
      </form>
    </div>
  );
};

export default PageOne;
```

And to read your state:

```tsx
import React from "react";

import { useGlobalState } from "./GlobalStateProvider";

const PageTwo = () => {
  const { state } = useGlobalState();
  const { firstname, age, lastname } = state;

  return (
    <div>
      <h1>State from PageOne:</h1>

      <h2>Name:</h2>
      <p>{`${firstname} ${lastname}`}</p>

      <h2>Age:</h2>
      <p>{age}</p>
      <h2>Debug the state:</h2>
      <Debug />
    </div>
  );
};

export default PageTwo;
```

And that's it! Probably my favourite thing about this method of state management is:

- **It's simplicity** - *it's almost exactly like using the useState hook, and therefore makes it very accessible to developers not yet familiar with global state management tools, but familiar with setting local state.*
- **It's type-safety** - *the compiler will throw an error if you try and put any content in your object that you didn't define in your interface* 😄🚀
