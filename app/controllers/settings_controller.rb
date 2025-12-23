class SettingsController < ApplicationController
  def index
  end

  def show
    setting = PlexSetting.first
    render json: setting
  end

  def create
    setting = PlexSetting.first_or_initialize
    
    if setting.update(setting_params)
      render json: setting, status: :ok
    else
      render json: { errors: setting.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def setting_params
    params.require(:plex_setting).permit(:host, :port, :auth_token)
  end
end
