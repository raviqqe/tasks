import React, {
  ChangeEvent,
  Component,
  ComponentClass,
  ComponentType,
  HTMLProps
} from "react";

import { Omit } from "../utils";

type InputProps = Pick<
  HTMLProps<HTMLInputElement | HTMLTextAreaElement>,
  "autoFocus" | "onBlur" | "onChange" | "onFocus" | "value"
>;

export interface IInternalProps {
  editing: boolean;
  inputProps: InputProps;
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

    private get inputProps(): InputProps {
      return {
        autoFocus: true,
        onBlur: () => this.setState({ editing: false }),
        onChange: ({
          target: { value }
        }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          this.setState({ text: value }),
        onFocus: (
          event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          event.target.value = "";
          event.target.value = this.props.text;
        },
        value: this.state.text
      };
    }
  };
