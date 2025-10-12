import { IBinaryService } from '../../storage/binary.storage';

export const createFile = (provider: IBinaryService) => {
  return async (path: string, data: string) => {
    await provider.createFile(path, data);
  };
};
