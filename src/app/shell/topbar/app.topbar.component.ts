import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  trigger,
  style,
  transition,
  animate,
  AnimationEvent
} from '@angular/animations';
import { MegaMenuItem } from 'primeng/api';
import { AppComponent } from '../../app.component';
import { ShellComponent } from '../shell.component';
import { I18nService } from '@app/i18n';
import { head } from 'lodash';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  animations: [
    trigger('topbarActionPanelAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scaleY(0.8)' }),
        animate(
          '.12s cubic-bezier(0, 0, 0.2, 1)',
          style({ opacity: 1, transform: '*' })
        )
      ]),
      transition(':leave', [animate('.1s linear', style({ opacity: 0 }))])
    ])
  ]
})
export class AppTopBarComponent implements OnInit {
  constructor(
    public appMain: ShellComponent,
    public app: AppComponent,
    private i18nService: I18nService
  ) {}

  activeItem: number;

  model: MegaMenuItem[] = [
    {
      label: 'UI KIT',
      items: [
        [
          {
            label: 'UI KIT 1',
            items: [
              {
                label: 'Form Layout',
                icon: 'pi pi-fw pi-id-card',
                routerLink: ['/uikit/formlayout']
              },
              {
                label: 'Input',
                icon: 'pi pi-fw pi-check-square',
                routerLink: ['/uikit/input']
              },
              {
                label: 'Float Label',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: ['/uikit/floatlabel']
              },
              {
                label: 'Button',
                icon: 'pi pi-fw pi-mobile',
                routerLink: ['/uikit/button']
              },
              {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                routerLink: ['/uikit/file']
              }
            ]
          }
        ],
        [
          {
            label: 'UI KIT 2',
            items: [
              {
                label: 'Table',
                icon: 'pi pi-fw pi-table',
                routerLink: ['/uikit/table']
              },
              {
                label: 'List',
                icon: 'pi pi-fw pi-list',
                routerLink: ['/uikit/list']
              },
              {
                label: 'Tree',
                icon: 'pi pi-fw pi-share-alt',
                routerLink: ['/uikit/tree']
              },
              {
                label: 'Panel',
                icon: 'pi pi-fw pi-tablet',
                routerLink: ['/uikit/panel']
              },
              {
                label: 'Chart',
                icon: 'pi pi-fw pi-chart-bar',
                routerLink: ['/uikit/charts']
              }
            ]
          }
        ],
        [
          {
            label: 'UI KIT 3',
            items: [
              {
                label: 'Overlay',
                icon: 'pi pi-fw pi-clone',
                routerLink: ['/uikit/overlay']
              },
              {
                label: 'Media',
                icon: 'pi pi-fw pi-image',
                routerLink: ['/uikit/media']
              },
              {
                label: 'Menu',
                icon: 'pi pi-fw pi-bars',
                routerLink: ['/uikit/menu']
              },
              {
                label: 'Message',
                icon: 'pi pi-fw pi-comment',
                routerLink: ['/uikit/message']
              },
              {
                label: 'Misc',
                icon: 'pi pi-fw pi-circle-off',
                routerLink: ['/uikit/misc']
              }
            ]
          }
        ]
      ]
    },
    {
      label: 'UTILITIES',
      items: [
        [
          {
            label: 'UTILITIES 1',
            items: [
              {
                label: 'Icons',
                icon: 'pi pi-fw pi-prime',
                routerLink: ['utilities/icons']
              },
              {
                label: 'PrimeFlex',
                icon: 'pi pi-fw pi-desktop',
                url: 'https://www.primefaces.org/primeflex/',
                target: '_blank'
              }
            ]
          }
        ]
      ]
    }
  ];

  @ViewChild('searchInput') searchInputViewChild: ElementRef;

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  ngOnInit() {
    const langModel: MegaMenuItem = {
      label: 'LANGUAGE',
      items: [
        [
          {
            label: 'LANGUAGE',
            items: []
          }
        ]
      ]
    };

    this.languages.forEach((q: string) => {
      head(head(langModel.items)).items.push({
        label: q,
        command: (event: any) => {
          this.setLanguage(event.item.label);
        }
      });
    });

    this.model.push(langModel);
  }

  onSearchAnimationEnd(event: AnimationEvent) {
    switch (event.toState) {
      case 'visible':
        this.searchInputViewChild.nativeElement.focus();
        break;
    }
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }
}
