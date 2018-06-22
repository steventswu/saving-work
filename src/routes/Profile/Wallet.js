import React from 'react';
import { Form, Input, Button, List, Icon } from 'antd';
import { compose } from 'redux';
import { connect } from 'dva';

import styles from './Wallet.less';

const enhancer = compose(Form.create(), connect());

export default enhancer(({ form: { getFieldDecorator, validateFields }, dispatch }) => (
  <React.Fragment>
    <h1>Wallet Verification</h1>
    <p>To link a new ethereum address, enter the address below. You can link up to 3 addresses.</p>
    <div style={{ width: 800 }}>
      <Form layout="horizontal" hideRequiredMark className={styles.form}>
        <Form.Item style={{ flex: 1, marginRight: 10 }}>
          {getFieldDecorator('walletAddress', {
            rules: [{ required: true, type: 'string', message: 'Enter Wallet Address' }],
          })(<Input type="text" placeholder="Enter Wallet Address" />)}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={() =>
              validateFields((err, values) => {
                if (err) return;
                dispatch({ type: 'redeem', payload: values });
              })
            }
          >
            Link Address
          </Button>
        </Form.Item>
      </Form>
      <List
        dataSource={[
          '0xeccdbbcbf7e7c030f75311163ed96711e8fdbe0f',
          '0xeccdbbcbf7e7c030f75311163ed96711e8fdbe0f',
          '0xeccdbbcbf7e7c030f75311163ed96711e8fdbe0f',
        ]}
        renderItem={item => (
          <List.Item className={styles.listItem}>
            {item} <Icon type="check-circle-o" />
          </List.Item>
        )}
      />
    </div>
  </React.Fragment>
));
