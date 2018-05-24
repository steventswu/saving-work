import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select } from 'antd';
import { routerRedux } from 'dva/router';
import Metamask from 'src/services/Metamask';
import styles from './style.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};

@Form.create()
@connect(({ user, token }) => ({
  data: token,
  currentUser: user,
}))
export default class Step2 extends React.PureComponent {
  onValidateForm = () => {
    this.props.form.validateFields((err, values) => {
      if (err) return;
      this.props.dispatch(routerRedux.push('/token/3'));
      if (Metamask.isInstalled) {
        this.props.dispatch({
          type: 'token/openMetamask',
          payload: {
            fromAddress: values.walletAddress,
            contractNumber: values.cap,
            amount: values.amount,
          },
        });
      } else {
        this.props.dispatch({
          type: 'user/updateWalletAddress',
          payload: {
            walletAddress: values.walletAddress,
          },
        });
      }
    });
  };

  onChangeCap = cap => {
    this.props.dispatch({
      type: 'token/saveStepFormData',
      payload: {
        cap,
      },
    });
  };

  onChangeWalletAddress = e => {
    this.props.dispatch({
      type: 'user/saveWalletAddress',
      payload: {
        walletAddress: e.target.value,
      },
    });
  };

  onChangeAmount = amount => {
    this.props.dispatch({
      type: 'token/saveStepFormData',
      payload: {
        amount,
      },
    });
  };

  render() {
    const { form: { getFieldDecorator }, data, currentUser } = this.props;
    return (
      <div className={styles.wrapper}>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="CAP">
            {getFieldDecorator('cap', {
              initialValue: data.cap,
              rules: [{ required: true, type: 'string', message: 'Choose CAP' }],
            })(
              <Select placeholder="CAP 01" onChange={this.onChangeCap}>
                <Option value="CAP01">CAP01</Option>
                <Option value="CAP02">CAP02</Option>
                <Option value="CAP03">CAP03</Option>
              </Select>
            )}
          </Form.Item>
          {Metamask.isDisabled && (
            <Form.Item {...formItemLayout} label="Your Wallet Address">
              {getFieldDecorator('walletAddress', {
                initialValue: currentUser.walletAddress,
                rules: [
                  {
                    required: true,
                    type: 'string',
                    pattern: /^(0x)?[0-9A-Za-z]{40}$/,
                    message: 'Enter correct wallet address to continue',
                  },
                ],
              })(
                <Input
                  placeholder="EX:0xeccdbbcbf7e7c030f75311163ed96711e8fdbe0f"
                  onChange={this.onChangeWalletAddress}
                />
              )}
            </Form.Item>
          )}
          <Form.Item {...formItemLayout} label="Amount">
            {getFieldDecorator('amount', {
              initialValue: data.amount,
              rules: [
                {
                  required: true,
                  message: 'Enter amount',
                },
              ],
            })(<Input placeholder="EX:100000000000" onChange={this.onChangeAmount} />)}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={this.onValidateForm}>
              Next
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}