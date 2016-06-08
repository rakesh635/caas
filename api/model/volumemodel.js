var volumemodel = volumemodel || {};
(function (model) {
	"use strict";
	model.Volume = function () {
		return {
			"description": "",
			"name": "",
			"driver": "",
		};
	};
	model.VolumeAccessKeys = {
		GetVolumes: 'volumelist',
		GetVolume: 'volumeget',
		CreateVolume: 'volumecreate',		
		RemoveVolume: 'volumeremove',
		ActivateVolume: 'volumeactivate',
		AllocateVolume: 'volumeallocate',
		DeallocateVolume: 'volumedeallocate',
		UpdateVolume: 'volumeupdate',
		DeleteVolume: 'volumedelete',
		PurgeVolume: 'volumepurge',
		RestoreVolume:'volumerestore'
	};
}(volumemodel));
module.exports = volumemodel;