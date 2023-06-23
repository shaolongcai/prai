import FlowCard from "./FlowCard"
import { Grid } from '../app/lib/mui';

function FlowCardList(props) {

    const { onClick } = props

    const topics = [
        "登录流程",
        "注册流程",
        "第三方登录流程",
        "多账户体系",
        "Topic5",
        "Topic6",
        "Topic7",
        "Topic8",
        "Topic9",
        "Topic10",
    ];


    return (
        <Grid
            className="p-4"
            container spacing={2} justifyContent="flex-start">
            {topics.map((topic, index) => (
                <Grid item xs={3} key={index}>
                    <FlowCard onClick={onClick} topic={topic} />
                </Grid>
            ))}
        </Grid>
    )
}

export default FlowCardList