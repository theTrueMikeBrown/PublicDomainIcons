import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconList } from './icon-list.component';

describe('IconListComponent', () => {
  let component: IconList;
  let fixture: ComponentFixture<IconListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
