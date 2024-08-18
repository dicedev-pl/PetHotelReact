import { Button } from "antd";
import { ToolOutlined } from "@ant-design/icons";


const InDevelop = () => {
  return (
    <>
      <div>
        <Button type={"primary"} disabled={true} color={"green"}>
          Creating View in progress
        </Button>
      </div>
      <div>
        <ToolOutlined />
      </div>
    </>
  )
};

export default InDevelop;