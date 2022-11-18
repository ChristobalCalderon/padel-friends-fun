import { useUser } from '@auth0/nextjs-auth0'
import Layout from '../components/layout'
import clientPromise from '../lib/mongodb'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  Select,
  Slider,
  Switch,
} from 'antd'
import type { DatePickerProps } from 'antd'
import { SmileFilled } from '@ant-design/icons'
import Link from 'next/link'

const FormItem = Form.Item
const Option = Select.Option

const content = {
  marginTop: '100px',
}

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { user, isLoading } = useUser()

  const onDatePickerChange: DatePickerProps['onChange'] = (
    date,
    dateString
  ) => {
    console.log(date, dateString)
  }

  return (
    <Layout user={user} loading={isLoading}>
      {isLoading && <p>Loading login info...</p>}

      {!isLoading && !user && (
        <>
          <p>
            To test the login click in <i>Login</i>
          </p>
          <p>
            Once you have logged in you should be able to navigate between
            protected routes: client rendered, server rendered profile pages,
            and <i>Logout</i>
          </p>
        </>
      )}

      {user && isConnected && (
        <>
          <h4>Rendered user info on the client</h4>
          <img src={user.picture!} alt="user picture" />
          <p>nickname: {user.nickname}</p>
          <p>name: {user.name}</p>
          <h4>You are connected to MongoDB</h4>
          <div style={content}>
            <div className="text-center mb-5">
              <Link href="#" className="logo mr-0">
                <SmileFilled style={{ fontSize: 48 }} />
              </Link>

              <p className="mb-0 mt-3 text-disabled">Welcome to the world !</p>
            </div>
            <div>
              <Form
                layout="horizontal"
                size={'large'}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
              >
                <FormItem label="Input Number">
                  <InputNumber
                    min={1}
                    max={10}
                    style={{ width: 100 }}
                    defaultValue={3}
                    name="inputNumber"
                  />
                </FormItem>

                <FormItem label="Switch">
                  <Switch defaultChecked />
                </FormItem>

                <FormItem label="Slider">
                  <Slider defaultValue={70} />
                </FormItem>

                <FormItem label="Select">
                  <Select defaultValue="lucy" style={{ width: 192 }}>
                    <Option value="jack">jack</Option>
                    <Option value="lucy">lucy</Option>
                    <Option value="disabled" disabled>
                      disabled
                    </Option>
                    <Option value="yiminghe">yiminghe</Option>
                  </Select>
                </FormItem>

                <FormItem label="DatePicker">
                  <DatePicker showTime onChange={onDatePickerChange} />
                </FormItem>
                <FormItem style={{ marginTop: 48 }} wrapperCol={{ offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                    OK
                  </Button>
                  <Button style={{ marginLeft: 8 }}>Cancel</Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </>
      )}
    </Layout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const client = await clientPromise
    const db = client.db();
    const documents = db.collection("events").find({});
    documents.forEach(element => {
      console.log("Id ", element._id);
      console.log("Element ", element);
    });

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

