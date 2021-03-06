class ExportsHandler {
  constructor(service, validator, playlistsongsService) {
    this._service = service;
    this._validator = validator;
    this._playlistsongsService = playlistsongsService;

    this.postExportPlaylistHandler = this.postExportPlaylistHandler.bind(this);
  }

  async postExportPlaylistHandler(request, h) {
    this._validator.validateExportPlaylistsPayload(request.payload);

    const { playlistId } = request.params;
    const { id: userId } = request.auth.credentials;

    await this._playlistsongsService.verifyPlaylistAccess(playlistId, userId);

    const message = {
      userId: request.auth.credentials.id,
      targetEmail: request.payload.targetEmail,
      playlistId,
    };

    await this._service.sendMessage('export:playlists', JSON.stringify(message));

    const response = h.response({
      status: 'success',
      message: 'Permintaan Anda dalam antrean',
    });
    response.code(201);
    return response;
  }
}

module.exports = ExportsHandler;
