import React from 'react';
import { Table } from 'antd';
import idx from 'idx';
import i18n from 'src/i18n';

const columns = [
  {
    title: '',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: i18n.t('performance:r2'),
    dataIndex: 'r2',
    key: 'r2',
  },
  {
    title: i18n.t('performance:beta'),
    dataIndex: 'beta',
    key: 'beta',
  },
  {
    title: i18n.t('performance:aplha'),
    dataIndex: 'alpha',
    key: 'alpha',
  },
  {
    title: '',
    dataIndex: 'sharpe',
    key: 'address',
  },
  {
    title: '',
    dataIndex: 'volatilty',
    key: 'action',
  },
];

export default class NavTable extends React.PureComponent {
  render() {
    const { performance } = this.props;
    const { analysis } = performance;

    const data = [
      {
        key: '1',
        name: <span>{idx(analysis[0], _ => _.label)}</span>,
        r2: <span style={{ color: '#1890ff' }}>{idx(analysis[0], _ => _.r2)}</span>,
        beta: <span style={{ color: '#1890ff' }}>{idx(analysis[0], _ => _.beta)}</span>,
        alpha: <span style={{ color: '#1890ff' }}>{idx(analysis[0], _ => _.alpha)}</span>,
        sharpe: i18n.t('performance:sharpe_ratio'),
        volatilty: i18n.t('performance:monthly_volatility'),
      },
      {
        key: '2',
        name: <span>{idx(analysis[1], _ => _.label)}</span>,
        r2: <span style={{ color: '#1890ff' }}>{idx(analysis[1], _ => _.r2)}</span>,
        beta: <span style={{ color: '#1890ff' }}>{idx(analysis[1], _ => _.beta)}</span>,
        alpha: <span style={{ color: '#1890ff' }}>{idx(analysis[1], _ => _.alpha)}</span>,
        sharpe: <span style={{ color: '#1890ff' }}>{idx(analysis[4], _ => _.sharperatio)}</span>,
        volatilty: (
          <span style={{ color: '#1890ff' }}>{idx(analysis[4], _ => _.monthlyvolatility)}</span>
        ),
      },
      {
        key: '3',
        name: <span>{idx(analysis[2], _ => _.label)}</span>,
        r2: <span style={{ color: '#1890ff' }}>{idx(analysis[2], _ => _.r2)}</span>,
        beta: <span style={{ color: '#1890ff' }}>{idx(analysis[2], _ => _.beta)}</span>,
        alpha: <span style={{ color: '#1890ff' }}>{idx(analysis[2], _ => _.alpha)}</span>,
        sharpe: i18n.t('performance:bitcoin_sharpe'),
        volatilty: i18n.t('performance:bitcoin_volatility'),
      },
      {
        key: '4',
        name: <span>{idx(analysis[3], _ => _.label)}</span>,
        r2: <span style={{ color: '#1890ff' }}>{idx(analysis[3], _ => _.r2)}</span>,
        beta: <span style={{ color: '#1890ff' }}>{idx(analysis[3], _ => _.beta)}</span>,
        alpha: <span style={{ color: '#1890ff' }}>{idx(analysis[3], _ => _.alpha)}</span>,
        sharpe: <span style={{ color: '#1890ff' }}>{idx(analysis[4], _ => _.bitcoinsharpe)}</span>,
        volatilty: (
          <span style={{ color: '#1890ff' }}>{idx(analysis[4], _ => _.yearlyvolatility)}</span>
        ),
      },
    ];
    return <Table columns={columns} dataSource={data} pagination={false} size="small" />;
  }
}
