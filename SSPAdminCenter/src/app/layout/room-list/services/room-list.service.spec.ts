import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TokenStorage } from '../../../core/token.storage';
import { RoomListService } from './room-list.service';

describe('RoomListService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RoomListService, TokenStorage],
        });
    });

    it('should be created', inject([RoomListService], (service: RoomListService) => {
        expect(service).toBeTruthy();
    }));
});
