import classNames from 'classnames/bind';
import styles from '@components/sections/Calendar.module.scss';
import Section from '@/components/shared/Section';
import { ko } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import { memo } from 'react';

import 'react-day-picker/dist/style.css';
import { parseISO, format } from 'date-fns';

const cx = classNames.bind(styles);

const css = `
  .rdp-nav {
    display:none;
  }
  .rdp-month_caption {
    display:none;
  }
  .rdp-cell {
    cursor: default;
  }
  .rdp-head_cell{
    font-weight: 500;
    font-size: 14px;
  }
  .rdp-day_selected{
    background-color: var(--red);
    font-weight: bold;
    color: #fff;
  }
  .rdp-day_selected:hover{
    background-color: var(--red);
  }
`;

function Calendar({ date }: { date: string }) {
  const weddingDate = parseISO(date);
  return (
    <Section
      title={
        <div className={cx('wrap-header')}>
          <span className={cx('txt-date')}>
            {format(weddingDate, 'yyyy.MM.dd')}
          </span>
          <span className={cx('txt-time')}>
            {format(weddingDate, 'aaa h시 eeee', { locale: ko })}
          </span>
        </div>
      }
    >
      <div className={cx('wrap-calendar')}>
        <style>{css}</style>
        <DayPicker
          locale={ko}
          month={weddingDate}
          selected={[weddingDate]}
          formatters={{ formatCaption: () => '' }}
        />
      </div>
    </Section>
  );
}

export default memo(Calendar);
