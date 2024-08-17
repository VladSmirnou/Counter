import React from 'react';
import s from './Scoreboard.module.css';
import { classNameBuilder } from '../../utils/classNameBulder';
import {SETTINGS_MODE_ON_TEXT} from './constants';
import { ScoreboardPropsType } from './scoreboardTypes';

export const Scoreboard: React.FC<ScoreboardPropsType> = ({
  counterValue,
  counterV_lt_MaxV,
  settingsModeOn,
  error
}) => {
  const builder = new classNameBuilder;
  builder.addClass(s.default);

  if (!counterV_lt_MaxV && !settingsModeOn) builder.addClass(s.counterV_gte_MaxV);
  else if (settingsModeOn && !error) builder.addClass(s.settingsModeOn);
  else if (error) builder.addClass(s.error);

  const finalClassName = builder.build();
  const scoreBoardText = error ? error
    : settingsModeOn ? SETTINGS_MODE_ON_TEXT
    : counterValue;

  return (
    <p className={finalClassName}>{scoreBoardText}</p>
  )
}
