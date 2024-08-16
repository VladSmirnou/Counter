import React from 'react';
import s from './Scoreboard.module.css';
import { classNameBuilder } from '../../utils/classNameBulder';


type ScoreboardPropsType = {
  counterValue: number
  counterV_lt_MaxV: boolean
  settingsModeOn: boolean
  error: string | null
}

const SETTINGS_MODE_ON_TEXT = "enter values and press 'set'";

export const Scoreboard: React.FC<ScoreboardPropsType> = ({
  counterValue,
  counterV_lt_MaxV,
  settingsModeOn,
  error
}) => {

  const builder = new classNameBuilder;
  
  if (!counterV_lt_MaxV && !settingsModeOn) builder.addClass(s.counterV_gte_MaxV);
  else if (settingsModeOn && !error) builder.addClass(s.settingsModeOn);
  else if (error) builder.addClass(s.error);
  else builder.addClass(s.counterVinRange);

  const finalClassName = builder.build();
  const scoreBoardText = error ? error
    : settingsModeOn ? SETTINGS_MODE_ON_TEXT
    : counterValue;

  return (
    <p className={finalClassName}>{scoreBoardText}</p>
  )
}
