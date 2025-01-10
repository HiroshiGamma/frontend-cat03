import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepostformComponent } from './createpostform.component';

describe('CreatepostformComponent', () => {
  let component: CreatepostformComponent;
  let fixture: ComponentFixture<CreatepostformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatepostformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatepostformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
