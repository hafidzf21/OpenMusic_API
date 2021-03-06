const InvariantError = require('../../exceptions/InvariantError');
const { PlaylistsongsPayloadSchema } = require('./schema');

const PlaylistsongsValidator = {
  validatePlaylistsongPayload: (payload) => {
    const validationResult = PlaylistsongsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PlaylistsongsValidator;
