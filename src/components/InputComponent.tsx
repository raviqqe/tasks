import * as React from "react";

export interface IProps {
  onEdit: (text: string) => void;
  text: string;
}

export interface IState {
  editing: boolean;
  text: string;
}

export default abstract class InputComponent<
  P extends IProps = IProps
> extends React.Component<P, IState> {
  public state: IState = { editing: false, text: "" };

  public componentDidUpdate(_, { editing }: IState) {
    if (!editing && this.state.editing) {
      this.setState({ text: this.props.text });
    } else if (editing && !this.state.editing) {
      this.props.onEdit(this.state.text);
    }
  }

  protected getFormProps = () => ({
    autoFocus: true,
    onBlur: () => this.setState({ editing: false }),
    onChange: ({ target: { value } }: React.ChangeEvent<any>) =>
      this.setState({ text: value }),
    onFocus: event => {
      event = event as React.FormEvent<HTMLInputElement>;
      event.target.value = "";
      event.target.value = this.props.text;
    },
    value: this.state.text
  });

  protected onEnterKeyDown = (event: React.KeyboardEvent<{}>) => {
    if (event.keyCode === 13) {
      this.setState({ editing: false });
      event.preventDefault();
    }
  };
}
