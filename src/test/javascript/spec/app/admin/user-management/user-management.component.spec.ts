import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplication2TestModule } from '../../../test.module';
import { UserMgmtComponent } from '../../../../../../main/webapp/app/admin/user-management/user-management.component';
import { UserService, User } from '../../../../../../main/webapp/app/shared';

describe('Component Tests', () => {

    describe('User Management Component', () => {
        let comp: UserMgmtComponent;
        let fixture: ComponentFixture<UserMgmtComponent>;
        let service: UserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplication2TestModule],
                declarations: [UserMgmtComponent],
                providers: [
                    UserService
                ]
            })
            .overrideTemplate(UserMgmtComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserMgmtComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserService);
        });

        describe('OnInit', () => {
            it('Should call load all on init',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const headers = new HttpHeaders().append('link', 'link;link');
                        spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                            body: [new User('9fec3727-3421-4967-b213-ba36557ca194')],
                            headers
                        })));

                        // WHEN
                        comp.ngOnInit();
                        tick(); // simulate async

                        // THEN
                        expect(service.query).toHaveBeenCalled();
                        expect(comp.users[0]).toEqual(jasmine.objectContaining({id: '9fec3727-3421-4967-b213-ba36557ca194'}));
                    })
                )
            );
        });

        describe('setActive', () => {
            it('Should update user and call load all',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const headers = new HttpHeaders().append('link', 'link;link');
                        const user = new User('9fec3727-3421-4967-b213-ba36557ca194');
                        spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                            body: [user],
                            headers
                        })));
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ status: 200 })));

                        // WHEN
                        comp.setActive(user, true);
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(user);
                        expect(service.query).toHaveBeenCalled();
                        expect(comp.users[0]).toEqual(jasmine.objectContaining({id: '9fec3727-3421-4967-b213-ba36557ca194'}));
                    })
                )
            );
        });
    });

});
