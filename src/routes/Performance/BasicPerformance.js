import React, { PureComponent, Fragment } from 'react';
import numeral from 'numeral';
import { connect } from 'dva';
import { Row, Col, Tooltip, Icon } from 'antd';
import HighchartsReact from 'react-highcharts/';
import { ChartCard, dollar } from 'components/Charts';
import NumberInfo from 'components/NumberInfo';
import Title from 'components/Title';
import Subtitle from 'components/Subtitle';
import NavTable from 'components/NavTable';
import HoldingsTable from 'components/HoldingsTable';
import { navChartOptions } from './options';

const Dollar = ({ children }) => (
  <span
    dangerouslySetInnerHTML={{ __html: dollar(children) }}
  /> /* eslint-disable-line react/no-danger */
);

@connect(({ performance }) => ({
  performance,
}))
export default class BasicPerformance extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'performance/fetchPerformance',
      // payload: {
      //   type: 'cap01'
      // }
    });
  }

  handleRowClick = record => {
    this.props.dispatch({
      type: 'performance/fetchCoinData',
      payload: {
        startDate: '2017-01-01',
        symbol: record.coin.name.toLowerCase(),
      },
    });
  };

  render() {
    const { performance } = this.props;
    const { info } = performance;

    return (
      <Fragment>
        <section>
          <Title title="Net Asset Value" />
          <Row gutter={24}>
            <Col xl={8} style={{ marginBottom: 24 }}>
              <ChartCard
                title="NAV"
                action={
                  <Tooltip title="net asset value">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={() => <Dollar>{info.nav}</Dollar>}
                contentHeight={130}
                style={{ marginBottom: 24 }}
              >
                <Row type="flex" justify="space-between">
                  <Col>
                    <NumberInfo
                      subTitle={<span>Historical</span>}
                      status="up"
                      subTotal={info['nav-historical']}
                    />
                    <NumberInfo status="up" subTotal={info['nav-historical-pct']} />
                  </Col>
                  <Col>
                    <NumberInfo
                      subTitle={<span>Hour</span>}
                      status="down"
                      subTotal={info['nav-hour']}
                    />
                    <NumberInfo status="down" subTotal={info['nav-hour-pct']} />
                  </Col>
                  <Col>
                    <NumberInfo
                      subTitle={<span>Day</span>}
                      status="down"
                      subTotal={info['nav-day']}
                    />
                    <NumberInfo status="down" subTotal={info['nav-day-pct']} />
                  </Col>
                  <Col>
                    <NumberInfo
                      subTitle={<span>Week</span>}
                      status="up"
                      subTotal={info['nav-week']}
                    />
                    <NumberInfo status="up" subTotal={info['nav-week-pct']} />
                  </Col>
                  <Col>
                    <NumberInfo
                      subTitle={<span>Month</span>}
                      status="up"
                      subTotal={info['nav-month']}
                    />
                    <NumberInfo status="up" subTotal={info['nav-month-pct']} />
                  </Col>
                </Row>
              </ChartCard>
              <ChartCard
                title="CAP Supply"
                action={
                  <Tooltip title="unit">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={numeral(info['cap-supply']).format('0,0.[0000]')}
                contentHeight={150}
                style={{ marginBottom: 24 }}
              />
              <ChartCard
                title="Fund Size"
                action={
                  <Tooltip title="USD">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={() => <Dollar>{info.fundsize}</Dollar>}
                contentHeight={150}
              />
            </Col>
            <Col xl={16} style={{ marginBottom: 24 }}>
              <ChartCard style={{ width: '100%' }}>
                <HighchartsReact config={navChartOptions} isPureConfig />
                <NavTable />
              </ChartCard>
            </Col>
          </Row>
        </section>
        <section>
          <Row type="flex" justify="space-between" align="middle">
            <Title title="Table of Holdings" />
            <Subtitle title={`${info.ofallmarketcap} Of All Market Cap`} />
          </Row>
          <Row gutter={24}>
            <Col style={{ marginBottom: 24 }}>
              <HoldingsTable performance={performance} onRowClick={this.handleRowClick} />
            </Col>
          </Row>
        </section>
      </Fragment>
    );
  }
}
