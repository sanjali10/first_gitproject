import { SspDownloadModule } from './ssp-download.module';

describe('SspDownloadModule', () => {
  let sspDownloadModule: SspDownloadModule;

  beforeEach(() => {
    sspDownloadModule = new SspDownloadModule();
  });

  it('should create an instance', () => {
    expect(sspDownloadModule).toBeTruthy();
  });
});
