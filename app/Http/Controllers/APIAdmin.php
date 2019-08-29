<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Lang;
use App;
use Config;
use App\Library\VO\ResponseJSON;
use App\Library\DAO\Trabajadores;
use App\Library\DAO\Admin;
use App\Library\DAO\Permisos_inter;
use Auth;
use carbon\Carbon;
use Illuminate\Support\Facades\Log;
use JWTAuth;
use JWTFactory;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Validator;
use Session;

class APIAdmin extends Controller
{

    public function SignIn(Request $request){
    
      Log::info('[SignIn]');
  
      Log::info("[SignIn] Método Recibido: ". $request->getMethod());
  
      return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
  
  
    }

    public function Ingresar(Request $request){
      
      Log::info('[APIAdmin][ingresar]');
  
      Log::info("[APIAdmin][ingresar] Método Recibido: ". $request->getMethod());
  
  
      if($request->isMethod('GET')) {
        
        $correo = $request->input('correo');
        $contPass = $request->input('contPass');
  
        Log::info("[APIAdmin][ingresar] correo: ". $correo);
        Log::info("[APIAdmin][ingresar] contPass: ". $contPass);
  
        $administrador = Admin::lookForByEmailAndPass($correo, $contPass)->get();
        
        if(count($administrador)>0){

          $permisos_inter_object = Permisos_inter::lookForByIdAdministradores($administrador->first()->id_administradores)->get();
          $permisos_inter = array();
          foreach($permisos_inter_object as $permiso){
            $permisos_inter[] = $permiso["id_permisos"];
          }
  
          $jwt_token = null;

          //limpiamos imágen para que no truene el JWT Token
          if(count($administrador)>0){  
            $administrador->first()->foto_base64 = "";
          }
  
          $factory = JWTFactory::customClaims([
            'sub'   => $administrador->first()->id_administradores, //id a conciliar del usuario
            'iss'   => config('app.name'),
            'iat'   => Carbon::now()->timestamp,
            'exp'   => Carbon::tomorrow()->timestamp,
            'nbf'   => Carbon::now()->timestamp,
            'jti'   => uniqid(),
            'usr'   => $administrador->first(),
            'permisos' => $permisos_inter,
            'color' => 6,
            'colorHex' => "#ad0a38",
            "subdominio" => "pAdmin",
          ]);
          
          $payload = $factory->make();
          
          $jwt_token = JWTAuth::encode($payload);
          Log::info("[APIAdmin][ingresar] new token: ". $jwt_token->get());
          Log::info("[APIAdmin][ingresar] Permisos: ");
          Log::info($permisos_inter);
  
          $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDdata'), count($administrador));
          $responseJSON->data = $administrador;
          $responseJSON->token = $jwt_token->get();
          return json_encode($responseJSON);
  
          
  
        } else {
          $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBDFail'), count($administrador));
          $responseJSON->data = $administrador;
          return json_encode($responseJSON);
  
        }
  
        return "";
        
      } else {
        abort(404);
      }
    }

    public function Inicio(Request $request){
      
      Log::info('[APIAdmin][Inicio]');
  
      Log::info("[APIAdmin][Inicio] Método Recibido: ". $request->getMethod());
  
      if($request->isMethod('GET')) {
  
        $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);
  
        $this->validate($request, [
          'token' => 'required'
        ]);
          
        $token = $request->input('token');
  
        Log::info("[APIAdmin][Inicio] Token: ". $token);
  
        try {
  
          // attempt to verify the credentials and create a token for the user
          $token = JWTAuth::getToken();
          $token_decrypt = JWTAuth::getPayload($token)->toArray();

          if(in_array("1", $token_decrypt["permisos"])==1){
            
            return view('system.inicioAdmin',["title" => config('app.name'), 
                                              "lang" => "es", 
                                              "user" => $token_decrypt, 
                                              "color" => $token_decrypt['color'], 
                                              "colorHex" => $token_decrypt['colorHex'],
                                              "subdominio" => $token_decrypt['subdominio'],
                                            ]
                                    );
  

          } else {
            
            return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
            
          }
  
          //print_r($token_decrypt["id"]);
  
          //print_r($token_decrypt);
  
          
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
  
          //token_expired
      
          Log::info('[APIAdmin][Inicio] Token error: token_expired');
    
          return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
    
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
  
          //token_invalid
      
          Log::info('[APIAdmin][Inicio] Token error: token_invalid');
    
          return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
    
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
  
          //token_absent
      
          Log::info('[APIAdmin][Inicio] Token error: token_absent');
    
          return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
    
        }
  
  
  
      } else {
        abort(404);
      }
  
    }

    public function Perfil(Request $request){
      
      Log::info('[APIAdmin][Perfil]');
  
      Log::info("[APIAdmin][Perfil] Método Recibido: ". $request->getMethod());
  
      if($request->isMethod('GET')) {
  
        $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);
  
        $this->validate($request, [
          'token' => 'required'
        ]);
          
        $token = $request->input('token');
  
        try {
  
          // attempt to verify the credentials and create a token for the user
          $token = JWTAuth::getToken();
          $token_decrypt = JWTAuth::getPayload($token)->toArray();
  
          //print_r($token_decrypt["id"]);
  
          //print_r($token_decrypt);
  
          return view('system.perfilAdministradores',["title" => config('app.name'), 
                                        "lang" => "es", 
                                        "user" => $token_decrypt, 
                                        "color" => $token_decrypt['color'], 
                                        "colorHex" => $token_decrypt['colorHex'],
                                        "subdominio" => $token_decrypt['subdominio'],
                                      ]
                              );
  
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
  
          //token_expired
      
          Log::info('[APIAdmin][Perfil] Token error: token_expired');
    
          return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
    
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
  
          //token_invalid
      
          Log::info('[APIAdmin][Perfil] Token error: token_invalid');
    
          return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
    
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
  
          //token_absent
      
          Log::info('[APIAdmin][Perfil] Token error: token_absent');
    
          return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
    
        }
  
      } else {
        abort(404);
      }
  
    }

    public function PerfilPass(Request $request){
      
      Log::info('[APIAdmin][PerfilPass]');
  
      Log::info("[APIAdmin][PerfilPass] Método Recibido: ". $request->getMethod());
  
      if($request->isMethod('GET')) {
  
        $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);
  
        $this->validate($request, [
          'token' => 'required'
        ]);
          
        $token = $request->input('token');
  
        try {
  
          // attempt to verify the credentials and create a token for the user
          $token = JWTAuth::getToken();
          $token_decrypt = JWTAuth::getPayload($token)->toArray();
  
          //print_r($token_decrypt["id"]);
  
          //print_r($token_decrypt);
  
          
  
          if(in_array(1, $token_decrypt["permisos"])){
  
            return view('system.perfilAdministradoresPass',["title" => config('app.name'), 
                                          "lang" => "es", 
                                          "user" => $token_decrypt, 
                                          "color" => $token_decrypt['color'], 
                                          "colorHex" => $token_decrypt['colorHex'],
                                          "subdominio" => $token_decrypt['subdominio'],
                                        ]
                                );
  
            }
  
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
  
          //token_expired
      
          Log::info('[APIAdmin][PerfilPass] Token error: token_expired');
  
          return redirect('/');
    
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
  
          //token_invalid
      
          Log::info('[APIAdmin][PerfilPass] Token error: token_invalid');
  
          return redirect('/');
    
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
  
          //token_absent
      
          Log::info('[APIAdmin][PerfilPass] Token error: token_absent');
  
          return redirect('/');
    
        }
  
      } else {
        abort(404);
      }
  
    }
  
    public function ChangePerfilPass(Request $request)
    {
      Log::info('[APIAdmin][ChangePerfilPass]');
  
      Log::info("[APIAdmin][ChangePerfilPass] Método Recibido: ". $request->getMethod());
  
      if($request->isMethod('POST')) {
  
        $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);
  
        $this->validate($request, [
          'token' => 'required'
        ]);
          
        $token = $request->input('token');
  
        Log::info("[APIAdmin][ChangePerfilPass] Token: ". $token);
  
  
        try {
  
          // attempt to verify the credentials and create a token for the user
          $token = JWTAuth::getToken();
          $token_decrypt = JWTAuth::getPayload($token)->toArray();
  
          if(in_array(1, $token_decrypt["permisos"])){
  
            Log::info("[APIAdmin][ChangePerfilPass] Permiso Existente");
            
  
            Validator::make($request->all(), [
              'id_administradores' => 'required',
              'cont' => 'required',
            ])->validate();
            
            $id_administradores = $request->input('id_administradores');
            $cont = $request->input('cont');
  
            //print_r($token_decrypt["id"]);
  
            //print_r($token_decrypt);
  
            $Administradores = Admin::modPass($id_administradores, $cont);
  
            if($Administradores==1){
  
              $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($Administradores));
              $responseJSON->data = $Administradores;
              return json_encode($responseJSON);
  
            } else {
  
              $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($Administradores));
              $responseJSON->data = [];
              return json_encode($responseJSON);
  
            }
  
          }
  
          return redirect('/');
  
  
  
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
  
          //token_expired
      
          Log::info('[APIAdmin][ChangePerfilPass] Token error: token_expired');
  
          return redirect('/');
    
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
  
          //token_invalid
      
          Log::info('[APIAdmin][ChangePerfilPass] Token error: token_invalid');
  
          return redirect('/');
    
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
  
          //token_absent
      
          Log::info('[APIAdmin][ChangePerfilPass] Token error: token_absent');
  
          return redirect('/');
    
        } catch(Exception $e) {
  
          //Errores
      
          Log::info('[APIAdmin][ChangePerfilPass] ' . $e);
  
          return redirect('/');
  
        }
  
  
  
      } else {
        abort(404);
      }
  
    }
  

    public function Empresas(Request $request){
      
      Log::info('[APIAdmin][Empresas]');
  
      Log::info("[APIAdmin][Empresas] Método Recibido: ". $request->getMethod());
  
      if($request->isMethod('GET')) {
  
        $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);
  
        $this->validate($request, [
          'token' => 'required'
        ]);
          
        $token = $request->input('token');
  
        Log::info("[APIAdmin][Empresas] Token: ". $token);
  
        try {
  
          // attempt to verify the credentials and create a token for the user
          $token = JWTAuth::getToken();
          $token_decrypt = JWTAuth::getPayload($token)->toArray();

          if(in_array("1", $token_decrypt["permisos"])==1){
            
            return view('system.empresas',["title" => config('app.name'), 
                                          "lang" => "es", 
                                          "user" => $token_decrypt, 
                                          "color" => $token_decrypt['color'], 
                                          "colorHex" => $token_decrypt['colorHex'],
                                          "subdominio" => $token_decrypt['subdominio'],
                                        ]
                                );
  

          } else {
            
            return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
            
          }
  
          //print_r($token_decrypt["id"]);
  
          //print_r($token_decrypt);
  
          
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
  
          //token_expired
      
          Log::info('[APIAdmin][Empresas] Token error: token_expired');
    
          return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
    
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
  
          //token_invalid
      
          Log::info('[APIAdmin][Empresas] Token error: token_invalid');
    
          return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
    
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
  
          //token_absent
      
          Log::info('[APIAdmin][Empresas] Token error: token_absent');
    
          return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
    
        }
  
  
  
      } else {
        abort(404);
      }
  
    }

    public function GetAdmin(Request $request){

      Log::info('[APIAdmin][GetAdmin]');
  
      Log::info("[APIAdmin][GetAdmin] Método Recibido: ". $request->getMethod());
  
      if($request->isMethod('GET')) {
  
        $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);
  
        $this->validate($request, [
          'token' => 'required'
        ]);
          
        $token = $request->input('token');
  
        Log::info("[APIAdmin][GetAdmin] Token: ". $token);
  
  
        try {
  
          // attempt to verify the credentials and create a token for the user
          $token = JWTAuth::getToken();
          $token_decrypt = JWTAuth::getPayload($token)->toArray();
  
          if(in_array(1, $token_decrypt["permisos"])){
  
            Log::info("[APIAdmin][GetAdmin] Permiso Existente");
            
  
            Validator::make($request->all(), [
              'id_administradores' => 'required'
            ])->validate();
          
            $id_administradores = $request->input('id_administradores');
  
            //print_r($token_decrypt["id"]);
  
            //print_r($token_decrypt);
  
            $Administradores = Admin::lookByIdAdmin($id_administradores)->get();
  
            if(count($Administradores)>0){
  
              $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($Administradores));
              $responseJSON->data = $Administradores;
              return json_encode($responseJSON);
  
            } else {
  
              $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($Administradores));
              $responseJSON->data = [];
              return json_encode($responseJSON);
  
            }
  
          }
  
          return redirect('/');
  
  
  
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
  
          //token_expired
      
          Log::info('[APIAdmin][ChangePerfilPass] Token error: token_expired');
  
          return redirect('/');
    
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
  
          //token_invalid
      
          Log::info('[APIAdmin][ChangePerfilPass] Token error: token_invalid');
  
          return redirect('/');
    
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
  
          //token_absent
      
          Log::info('[APIAdmin][ChangePerfilPass] Token error: token_absent');
  
          return redirect('/');
    
        } catch(Exception $e) {
  
          //Errores
      
          Log::info('[APIAdmin][ChangePerfilPass] ' . $e);
  
          return redirect('/');
  
        }
  
  
  
      } else {
        abort(404);
      }
    }


    public function PerfilEditar(Request $request)
    {
      Log::info('[APITrabajadores][PerfilEditar]');
  
      Log::info("[APITrabajadores][PerfilEditar] Método Recibido: ". $request->getMethod());
  
      if($request->isMethod('POST')) {
  
        $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);
  
        $this->validate($request, [
          'token' => 'required'
        ]);
          
        $token = $request->input('token');
  
        Log::info("[APITrabajadores][PerfilEditar] Token: ". $token);
  
        try {
  
          // attempt to verify the credentials and create a token for the user
          $token = JWTAuth::getToken();
          $token_decrypt = JWTAuth::getPayload($token)->toArray();
  
          if(in_array(1, $token_decrypt["permisos"])){
  
            Validator::make($request->all(), [
              'correo' => 'required',
              'telefono_fijo' => 'required',
              'celular' => 'required'
            ])->validate();
            
            $correo = $request->input('correo');
            $telefono_fijo = $request->input('telefono_fijo');
            $celular = $request->input('celular');
  
            //print_r($token_decrypt["id"]);
  
            //print_r($token_decrypt);
  
            $Trabajadores = Admin::updateProfile($token_decrypt['usr']->id_trabajadores, $correo, $telefono_fijo, $celular);
          
            if($Trabajadores==1){
  
              $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($Trabajadores));
              $responseJSON->data = $Trabajadores;
              return json_encode($responseJSON);
  
            } else {
  
              $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($Trabajadores));
              $responseJSON->data = [];
              return json_encode($responseJSON);
  
            }
          } 
  
          return redirect('/');
  
  
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
  
          //token_expired
      
          Log::info('[APITrabajadores][PerfilEditar] Token error: token_expired');
  
          return redirect('/');
    
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
  
          //token_invalid
      
          Log::info('[APITrabajadores][PerfilEditar] Token error: token_invalid');
  
          return redirect('/');
    
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
  
          //token_absent
      
          Log::info('[APITrabajadores][PerfilEditar] Token error: token_absent');
  
          return redirect('/');
    
        } catch(Exception $e) {
  
          //Errores
      
          Log::info('[APITrabajadores][PerfilEditar] ' . $e);
  
          return redirect('/');
  
        }
  
  
  
      } else {
        abort(404);
      }
  
    }
  

    public function NuevaEmpresa(Request $request){
      
      Log::info('[APIAdmin][NuevaEmpresa]');
  
      Log::info("[APIAdmin][NuevaEmpresa] Método Recibido: ". $request->getMethod());
  
      if($request->isMethod('GET')) {
  
        $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);
  
        $this->validate($request, [
          'token' => 'required'
        ]);
          
        $token = $request->input('token');
  
        Log::info("[APIAdmin][NuevaEmpresa] Token: ". $token);
  
        try {
  
          // attempt to verify the credentials and create a token for the user
          $token = JWTAuth::getToken();
          $token_decrypt = JWTAuth::getPayload($token)->toArray();

          if(in_array("1", $token_decrypt["permisos"])==1){
            
            return view('system.nuevaempresa',["title" => config('app.name'), 
                                              "lang" => "es", 
                                              "user" => $token_decrypt, 
                                              "color" => $token_decrypt['color'], 
                                              "colorHex" => $token_decrypt['colorHex'],
                                              "subdominio" => $token_decrypt['subdominio'],
                                            ]
                                    );
  

          } else {
            
            return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
            
          }
  
          //print_r($token_decrypt["id"]);
  
          //print_r($token_decrypt);
  
          
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
  
          //token_expired
      
          Log::info('[APIAdmin][NuevaEmpresa] Token error: token_expired');
    
          return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
    
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
  
          //token_invalid
      
          Log::info('[APIAdmin][NuevaEmpresa] Token error: token_invalid');
    
          return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
    
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
  
          //token_absent
      
          Log::info('[APIAdmin][NuevaEmpresa] Token error: token_absent');
    
          return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
    
        }
  
  
  
      } else {
        abort(404);
      }
  
    }

    public function Administradores(Request $request){
      
      Log::info('[APIAdmin][Administradores]');
  
      Log::info("[APIAdmin][Administradores] Método Recibido: ". $request->getMethod());
  
      if($request->isMethod('GET')) {
  
        $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);
  
        $this->validate($request, [
          'token' => 'required'
        ]);
          
        $token = $request->input('token');
  
        Log::info("[APIAdmin][Administradores] Token: ". $token);
  
        try {
  
          // attempt to verify the credentials and create a token for the user
          $token = JWTAuth::getToken();
          $token_decrypt = JWTAuth::getPayload($token)->toArray();

          if(in_array("1", $token_decrypt["permisos"])==1){
            
            return view('system.administradores',["title" => config('app.name'), 
                                                  "lang" => "es", 
                                                  "user" => $token_decrypt, 
                                                  "color" => $token_decrypt['color'], 
                                                  "colorHex" => $token_decrypt['colorHex'],
                                                  "subdominio" => $token_decrypt['subdominio'],
                                                ]
                                        );
  

          } else {
            
            return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
            
          }
  
          //print_r($token_decrypt["id"]);
  
          //print_r($token_decrypt);
  
          
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
  
          //token_expired
      
          Log::info('[APIAdmin][Administradores] Token error: token_expired');
    
          return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
    
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
  
          //token_invalid
      
          Log::info('[APIAdmin][Administradores] Token error: token_invalid');
    
          return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
    
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
  
          //token_absent
      
          Log::info('[APIAdmin][Administradores] Token error: token_absent');
    
          return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
    
        }
  
  
  
      } else {
        abort(404);
      }
  
    }

    public function NuevoAdministrador(Request $request){
      
      Log::info('[APIAdmin][NuevoAdministrador]');
  
      Log::info("[APIAdmin][NuevoAdministrador] Método Recibido: ". $request->getMethod());
  
      if($request->isMethod('GET')) {
  
        $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);
  
        $this->validate($request, [
          'token' => 'required'
        ]);
          
        $token = $request->input('token');
  
        Log::info("[APIAdmin][NuevoAdministrador] Token: ". $token);
  
        try {
  
          // attempt to verify the credentials and create a token for the user
          $token = JWTAuth::getToken();
          $token_decrypt = JWTAuth::getPayload($token)->toArray();

          if(in_array("1", $token_decrypt["permisos"])==1){
            
            return view('system.nuevoadministrador',["title" => config('app.name'), 
                                                      "lang" => "es", 
                                                      "user" => $token_decrypt, 
                                                      "color" => $token_decrypt['color'], 
                                                      "colorHex" => $token_decrypt['colorHex'],
                                                      "subdominio" => $token_decrypt['subdominio'],
                                                    ]
                                            );
  

          } else {
            
            return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
            
          }
  
          //print_r($token_decrypt["id"]);
  
          //print_r($token_decrypt);
  
          
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
  
          //token_expired
      
          Log::info('[APIAdmin][NuevoAdministrador] Token error: token_expired');
    
          return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
    
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
  
          //token_invalid
      
          Log::info('[APIAdmin][NuevoAdministrador] Token error: token_invalid');
    
          return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
    
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
  
          //token_absent
      
          Log::info('[APIAdmin][NuevoAdministrador] Token error: token_absent');
    
          return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
    
        }
  
  
  
      } else {
        abort(404);
      }
  
    }

    public function Idiomas(Request $request){
      
      Log::info('[APIAdmin][Idiomas]');
  
      Log::info("[APIAdmin][Idiomas] Método Recibido: ". $request->getMethod());
  
      if($request->isMethod('GET')) {
  
        $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);
  
        $this->validate($request, [
          'token' => 'required'
        ]);
          
        $token = $request->input('token');
  
        Log::info("[APIAdmin][Idiomas] Token: ". $token);
  
        try {
  
          // attempt to verify the credentials and create a token for the user
          $token = JWTAuth::getToken();
          $token_decrypt = JWTAuth::getPayload($token)->toArray();

          if(in_array("1", $token_decrypt["permisos"])==1){
            
            return view('system.idiomas',["title" => config('app.name'), 
                                          "lang" => "es", 
                                          "user" => $token_decrypt, 
                                          "color" => $token_decrypt['color'], 
                                          "colorHex" => $token_decrypt['colorHex'],
                                          "subdominio" => $token_decrypt['subdominio'],
                                        ]
                                );
  

          } else {
            
            return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
            
          }
  
          //print_r($token_decrypt["id"]);
  
          //print_r($token_decrypt);
  
          
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
  
          //token_expired
      
          Log::info('[APIAdmin][Idiomas] Token error: token_expired');
    
          return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
    
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
  
          //token_invalid
      
          Log::info('[APIAdmin][Idiomas] Token error: token_invalid');
    
          return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
    
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
  
          //token_absent
      
          Log::info('[APIAdmin][Idiomas] Token error: token_absent');
    
          return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
    
        }
  
  
  
      } else {
        abort(404);
      }
  
    }
  
    public function Logout(Request $request){
      
      Log::info('[APIAdmin][Logout]');
  
      Log::info("[APIAdmin][Logout] Método Recibido: ". $request->getMethod());
  
      if($request->isMethod('GET')) {
  
        $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);
  
        $this->validate($request, [
          'token' => 'required'
        ]);
          
        $token = $request->input('token');
  
        try {

          // attempt to verify the credentials and create a token for the user
          $token = JWTAuth::getToken();
          $token_decrypt = JWTAuth::getPayload($token)->toArray();
  
          // attempt to verify the credentials and create a token for the user
          JWTAuth::parseToken()->invalidate();
  
          //print_r($token_decrypt["id"]);
  
          //print_r($token_decrypt);
  
          $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),"Token Invalidado Exitosamente", 0);
          $responseJSON->subdominio = $token_decrypt['subdominio'];
          return json_encode($responseJSON);
  
  
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
  
          //token_expired
      
          Log::info('[APITrabajadores][Logout] Token error: token_expired');
  
          $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),"Token Expirado", 0);
          return json_encode($responseJSON);
    
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
  
          //token_invalid
      
          Log::info('[APITrabajadores][Logout] Token error: token_invalid');
  
          $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),"Token Inválido", 0);
          return json_encode($responseJSON);
    
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
  
          //token_absent
      
          Log::info('[APITrabajadores][Logout] Token error: token_absent');
  
          $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),"Token Ausente", 0);
          return json_encode($responseJSON);
    
        }
  
  
  
      } else {
        abort(404);
      }
  
    }
}

?>