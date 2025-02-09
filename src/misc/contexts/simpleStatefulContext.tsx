import { createContext, FunctionComponent, useContext, useState } from "react";

export interface ProviderInputProps<StateType> { children?: JSX.Element; defaultValue: StateType }

export const createSimpleStatefulContext = <ContextType, StateType>(
  defaultContextValue: ContextType,
  state2ContextConverter: (
    arg: [StateType, React.Dispatch<React.SetStateAction<StateType>>],
  ) => ContextType,
): [
  FunctionComponent<ProviderInputProps<StateType>>,
  () => ContextType,
] => {
  const Context = createContext<ContextType>(defaultContextValue);

  const Provider = ({
    children,
    defaultValue,
  }: ProviderInputProps<StateType>) => {
    const state = useState<StateType>(defaultValue);

    return (
      <Context.Provider value={state2ContextConverter(state)}>
        {children}
      </Context.Provider>
    );
  };

  const useContextData = () => useContext(Context);

  return [Provider, useContextData];
};
