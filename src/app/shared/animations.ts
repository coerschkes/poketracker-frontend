import {animate, state, style, transition, trigger} from "@angular/animations";

export class Animations {
  static flyInOut = [
    trigger('flyInOut', [
      state('in', style({opacity: 1, transform: 'translateY(0)'})),
      transition('void => *', [
        style({opacity: 0, transform: 'translateY(100%)'}),
        animate('{{duration}}ms')
      ]),
      transition('* => void', [
        animate('{{duration}}ms', style({opacity: 0, transform: 'translateY(100%)'}))
      ])
    ])
  ];

  static detailExpand = [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ];


}
