/// <reference path="../../../index.d.ts" />

import * as React from 'react'
import { Container } from '../../atoms'
import ArcadeCityBG from '../../../resources/images/city.jpg'
import AvatarImg from '../../../resources/images/avatarImg.png'
import { Button } from '../../atoms';

export const Avatar = (props: any) => (
  <Container style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
    <div>
      <img width='100%' src={ArcadeCityBG} />
      <div>
        <img
          src={!false ? AvatarImg : ''}
        />
        <div onClick={() => alert('yessss')}>
          <Button />
        </div>
      </div>
    </div>
  </Container>
)
