import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import UnitSettingsLayout from '@/layouts/units/settings';
import { SharedData, Unit, type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Units',
        href: '/units',
    },
];

type ProfileForm = {
    _method: 'patch';
    avatar?: Blob;
    banner?: Blob;
    display_name: string;
    description?: string;
};

export default function Edit() {
    const { unit } = usePage<SharedData & { unit: Unit }>().props;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        _method: 'patch',
        avatar: new Blob(),
        banner: new Blob(),
        display_name: unit.display_name,
        description: unit.description ?? '',
    });

    useEffect(() => {
        if (unit.avatar) {
            fetch(unit.avatar)
                .then(v => v.blob())
                .then(v => setData('avatar', v));
        }

        if (unit.banner) {
            fetch(unit.banner)
                .then(v => v.blob())
                .then(v => setData('banner', v));
        }
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('units.update', { unit: unit.slug }), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={[
            ...breadcrumbs,
            {
                title: unit.display_name,
                href: `/units/${unit.slug}`,
            },
            {
                title: 'Settings',
                href: `/units/${unit.slug}/edit`,
            },
        ]}>
            <Head title={unit.display_name} />
            <UnitSettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Unit profile" description="Update your unit's public profile information" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="avatar">Avatar</Label>
                            <Input
                                id="avatar"
                                type="file"
                                className="mt-1 block w-full"
                                onChange={(e) => setData('avatar', e.target.files![0])}
                            />
                            <InputError className="mt-2" message={errors.avatar} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="banner">Banner</Label>
                            <Input
                                id="banner"
                                type="file"
                                className="mt-1 block w-full"
                                onChange={(e) => setData('banner', e.target.files![0])}
                            />
                            <InputError className="mt-2" message={errors.banner} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="display_name">Display name</Label>

                            <Input
                                id="display_name"
                                className="mt-1 block w-full"
                                value={data.display_name}
                                onChange={(e) => setData('display_name', e.target.value)}
                                required
                                autoComplete="display_name"
                                placeholder="Display name"
                            />

                            <InputError className="mt-2" message={errors.display_name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description (optional)</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                disabled={processing}
                                placeholder="We are a milsim unit specialising in..."
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </UnitSettingsLayout>
        </AppLayout>
    );
}
