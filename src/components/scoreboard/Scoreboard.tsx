import React from 'react';
import s from './Scoreboard.module.css';


type ScoreboardPropsType = {
  counterValue: number
  counterV_lt_MaxV: boolean
  settingsModeOn: boolean
  error: string | null
}

export const Scoreboard: React.FC<ScoreboardPropsType> = ({
  counterValue,
  counterV_lt_MaxV,
  settingsModeOn,
  error
}) => {
  let finalClassName = s.counterVinRange
  if (!counterV_lt_MaxV) {
    finalClassName += ' ' + s.counterV_gte_MaxV
  }
  return (
    <p className={finalClassName}>{
      error ? error
        : settingsModeOn ? "enter values and press 'set'"
        : counterValue
    }</p>
  )
}
