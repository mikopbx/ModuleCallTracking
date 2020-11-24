<form class="ui large grey segment form" id="module-call-tracking-form">
    <div class="field">
        <label>{{ t._('mod_ct_SiteUrl') }}</label>
        {{ form.render('url') }}
    </div>
    <div class="field">
        <label>{{ t._('mod_ct_BasicAuth') }}</label>
        {{ form.render('auth_basic') }}
    </div>
    <div class="field">
        <div class="ui toggle checkbox">
            {{ form.render('is_post') }}
            <label>{{ t._('mod_ct_NeedPostRequest') }}</label>
        </div>
    </div>

    <div class="field">
        <div class="ui toggle checkbox">
            {{ form.render('is_1c') }}
            <label>{{ t._('mod_ct_ItIs1CRequest') }}</label>
        </div>

    </div>
    {{ partial("partials/submitbutton",['indexurl':'pbx-extension-modules/index/']) }}
</form>