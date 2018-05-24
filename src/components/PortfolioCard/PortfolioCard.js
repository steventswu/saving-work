import React from 'react';
import { Card } from 'antd';
import classNames from 'classnames';

import styles from './PortfolioCard.less';
import PortfolioItem from './PortfolioItem';

export default function PortfolioCard({ data = {}, selected, onSelect }) {
  return (
    <Card
      className={classNames(styles.card, { [styles.cardSelected]: selected })}
      hoverable
      title={data.title}
      onClick={() => onSelect(data.id)}
    >
      <div className={styles.subtitle}>
        <h3>{data.type}</h3>
        <hr />
        <h3>{data.description}</h3>
      </div>
      <div style={{ marginBottom: 20 }}>
        {data.info.map(card => (
          <PortfolioItem key={card.key} title={card.title} content={card.content} />
        ))}
      </div>
      <div>
        {data.meta.map(card => (
          <PortfolioItem key={card.key} title={card.title} content={card.content} secondary />
        ))}
      </div>
    </Card>
  );
}