import * as React from "react";

import SubInformation from "./SubInformation";

interface IProps {
    label: string;
    timeStamp: number;
}

export default class extends React.Component<IProps> {
    public render() {
        const { label, timeStamp } = this.props;

        return <SubInformation>{label}: {(new Date(1000 * timeStamp)).toLocaleDateString()}</SubInformation>;
    }
}
