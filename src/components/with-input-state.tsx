import React, {
  ChangeEvent,
  Component,
  ComponentClass,
  ComponentType
} from "react";

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

interface IInputProps {
  autoFocus: true;
  onBlur: () => void;
  onChange: (event) => void;
  onFocus: (event) => void;
  value: string;
}

export interface IInternalProps {
  editing: boolean;
  inputProps: IInputProps;
  startEditing: () => void;
  stopEditing: () => void;
}

export interface IProps {
  onEdit: (text: string) => void;
  text: string;
}

export interface IState {
  editing: boolean;
  text: string;
}

export default <P extends IInternalProps>(
  Child: ComponentType<P>
): ComponentClass<Omit<P, keyof IInternalProps> & IProps> =>
  class extends Component<Omit<P, keyof IInternalProps> & IProps, IState> {
    public state: IState = { editing: false, text: "" };

    public render() {
      const { editing } = this.state;

      return (
        <Child
          {...this.props}
          editing={editing}
          inputProps={this.inputProps}
          startEditing={() => this.setState({ editing: true })}
          stopEditing={() => this.setState({ editing: false })}
        />
      );
    }

    public componentDidUpdate(_, { editing }: IState) {
      const { onEdit, text } = this.props;

      if (!editing && this.state.editing) {
        this.setState({ text });
      } else if (editing && !this.state.editing) {
        onEdit(this.state.text);
      }
    }

    private get inputProps(): IInputProps {
      return {
        autoFocus: true,
        onBlur: () => this.setState({ editing: false }),
        onChange: ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
          this.setState({ text: value }),
        onFocus: (event: ChangeEvent<HTMLInputElement>) => {
          event.target.value = "";
          event.target.value = this.props.text;
        },
        value: this.state.text
      };
    }
  };
