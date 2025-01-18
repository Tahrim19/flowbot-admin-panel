import { Typography, Collapse, Input, Button, Form } from "antd";
import { useTheme } from "../../theme";
import { CaretRightOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
const { TextArea } = Input;

const HelpSupport = () => {
  const { theme } = useTheme();
  const { token } = theme;

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form Submitted:", values);
    // Add form submission logic here (e.g., API call)
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: token.colorBgBase,
        color: token.colorTextBase,
        marginLeft: "210px",
      }}
    >
      {/* Page Title */}
      <Typography.Title
        level={2}
        style={{
          marginBottom: "1.5rem",
          color: token.colorTextBase,
          letterSpacing: "2px",
        }}
      >
        Help & Support
      </Typography.Title>

      {/* FAQ Section Title */}
      <Typography.Title
        level={5}
        style={{
          marginBottom: "1.5rem",
          color: token.colorTextBase,
        }}
      >
        Frequently Asked Questions (FAQs)
      </Typography.Title>

      {/* FAQ Accordion */}
      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: token.colorBgContainer,
          marginBottom: "1.5rem",
        }}
      >
        {/* FAQ 1 */}
        <Panel
          header={
            <Typography.Text style={{ color: token.colorPrimary }}>
              Setting up Integrations
            </Typography.Text>
          }
          key="1"
        >
          <Typography.Paragraph style={{ color: token.colorTextBase }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography.Paragraph>
        </Panel>

        {/* FAQ 2 */}
        <Panel
          header={
            <Typography.Text style={{ color: token.colorPrimary }}>
              Uploading and Managing Documents
            </Typography.Text>
          }
          key="2"
        >
          <Typography.Paragraph style={{ color: token.colorTextBase }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography.Paragraph>
        </Panel>

        {/* FAQ 3 */}
        <Panel
          header={
            <Typography.Text style={{ color: token.colorPrimary }}>
              Understanding Analytics
            </Typography.Text>
          }
          key="3"
        >
          <Typography.Paragraph style={{ color: token.colorTextBase }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography.Paragraph>
        </Panel>
      </Collapse>

      {/* Contact Form Title */}
      <Typography.Title
        level={5}
        style={{
          marginBottom: "1.5rem",
          paddingTop: "1rem",
          color: token.colorTextBase,
        }}
      >
        Contact Us
      </Typography.Title>

      {/* Contact Form Description */}
      <Typography.Paragraph
        style={{
          marginBottom: "1rem",
          color: token.colorTextBase,
        }}
      >
        If you need further assistance, please fill out the contact form below.
      </Typography.Paragraph>

      {/* Contact Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{
          background: token.colorBgContainer,
          padding: "20px",
          borderRadius: token.borderRadiusBase,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        {/* Name Field */}
        <Form.Item
          label={
            <Typography.Text style={{ color: token.colorTextBase }}>
              Name
            </Typography.Text>
          }
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input
            placeholder="Enter your name"
            style={{
              backgroundColor: token.colorBgBase,
              borderColor: token.colorBorder,
              color: token.colorTextBase,
            }}
          />
        </Form.Item>

        {/* Email Field */}
        <Form.Item
          label={
            <Typography.Text style={{ color: token.colorTextBase }}>
              Email
            </Typography.Text>
          }
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input
            placeholder="Enter your email"
            style={{
              backgroundColor: token.colorBgBase,
              borderColor: token.colorBorder,
              color: token.colorTextBase,
            }}
          />
        </Form.Item>

        {/* Message Field */}
        <Form.Item
          label={
            <Typography.Text style={{ color: token.colorTextBase }}>
              Message
            </Typography.Text>
          }
          name="message"
          rules={[{ required: true, message: "Please enter your message" }]}
        >
          <TextArea
            rows={4}
            placeholder="Enter your message"
            style={{
              backgroundColor: token.colorBgBase,
              borderColor: token.colorBorder,
              color: token.colorTextBase,
            }}
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: token.colorPrimary,
              borderColor: token.colorPrimary,
              color: token.colorTextLightSolid,
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default HelpSupport;
