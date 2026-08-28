import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotAuth } from './not-auth';

describe('NotAuth', () => {
  let component: NotAuth;
  let fixture: ComponentFixture<NotAuth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotAuth],
    }).compileComponents();

    fixture = TestBed.createComponent(NotAuth);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
